'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchAccountById } from '../data';

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  balance: z.coerce
    .number(),
  weight: z.coerce
    .number(),
  status: z.string(),
});

const CreateAccount = FormSchema.omit({ id: true });
const UpdateAccount = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    balance?: string[];
    weight?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createAccount(prevState: State, formData: FormData) {
  // Validate form using Zod.
  const validatedFields = CreateAccount.safeParse({
    name: formData.get('name'),
    balance: formData.get('balance'),
    weight: formData.get('weight'),
    status: formData.get('status') ? "true" : "false",
  });

  // If form validation fails, return errors clearly. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Account.',
    };
  }

  // Prepare data for insertion ino the database.
  const { name, balance, weight, status } = validatedFields.data;
  const amountInCents = balance * 100;

  // Insert data into the database.
  try {
    await sql`
      INSERT INTO account (name, balance, weight, status)
      VALUES (${name}, ${amountInCents}, ${weight}, ${status})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { 
      message: 'Database Error: Failed to Create Account.'
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/account');
  redirect('/dashboard/account');
}

export async function updateAccount(id: string, formData: FormData) {
  const { name, balance, weight, status } = UpdateAccount.parse({
    name: formData.get('name'),
    balance: formData.get('balance'),
    weight: formData.get('weight'),
    status: formData.get('status') ? "true" : "false",
  });
 
  const amountInCents = balance * 100;

  try {
    await sql`
      UPDATE account
      SET name = ${name}, balance = ${amountInCents}, weight = ${weight}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Account.' };
  }
 
  revalidatePath('/dashboard/account');
  redirect('/dashboard/account');
}

export async function deleteAccount(id: string) {
  try {
    await sql`DELETE FROM account WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Account.' };
  }

  revalidatePath('/dashboard/account');
  redirect('/dashboard/account');
  return { message: 'Deleted Account.' };
}

export async function updateBalance(id: string, operation: string, amountInCents: number) {
  const account = fetchAccountById(id);
  let currentBalanceInCents = (await account).balance * 100;

  let newBalanceInCents = 0;
  if (operation == 'add') {
    newBalanceInCents = currentBalanceInCents + amountInCents;
  } else {
    newBalanceInCents = currentBalanceInCents - amountInCents;
  }

  try {
    await sql`
      UPDATE account
      SET balance = ${newBalanceInCents}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Account.' };
  }
}
