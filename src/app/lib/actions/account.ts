'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  balance: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.boolean({
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateAccount = FormSchema.omit({ id: true });
const UpdateAccount = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    balance?: string[];
    status?: boolean[];
  };
  message?: string | null;
};

export async function createAccount(prevState: State, formData: FormData) {
  // Validate form using Zod.
  const validatedFields = CreateAccount.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors clearly. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion ino the database.
  const { name, balance, status } = validatedFields.data;
  const amountInCents = balance * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database.
  try {
    await sql`
      INSERT INTO invoices (name, amount, status)
      VALUES (${name}, ${amountInCents}, ${status})
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
  const { name, balance, status } = UpdateAccount.parse({
    name: formData.get('name'),
    balance: formData.get('balance'),
    status: formData.get('status'),
  });
 
  const amountInCents = balance * 100;

  try {
    await sql`
      UPDATE account
      SET name = ${name}, balance = ${amountInCents}, status = ${status}
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
    revalidatePath('/dashboard/account');
    return { message: 'Deleted Account.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Account.' };
  }
}

export async function updateBalance(id: string, amount: number) {
  try {
    await sql`
      UPDATE account
      SET name = balance = ${amount}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Account.' };
  }
}
