'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { formatDateToLocal } from '../utils';
import { updateBalance } from './account';

const FormSchema = z.object({
  id: z.string(),
  date: z.string({
    invalid_type_error: 'Please select a date.',
  }),
  categoryId: z.string({
    invalid_type_error: 'Please select a category.',
  }),
  accountId: z.string({
    invalid_type_error: 'Please select an account.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  notes: z.string(),
  status: z.any(),
});

const CreateIncome = FormSchema.omit({ id: true });
const UpdateIncome = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    date?: string[];
    categoryId?: string[];
    accountId?: string[];
    amount?: string[];
    notes?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createIncome(prevState: State, formData: FormData) {
  // Validate form using Zod.
  const validatedFields = CreateIncome.safeParse({
    date: formData.get('date'),
    categoryId: formData.get('categoryId'),
    accountId: formData.get('accountId'),
    amount: formData.get('amount'),
    notes: formData.get('notes'),
    status: formData.get('status') ? "true" : "false",
  });

  // If form validation fails, return errors clearly. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Income.',
    };
  }

  // Prepare data for insertion ino the database.
  const { date, categoryId, accountId, amount, notes, status } = validatedFields.data;
  const amountInCents = amount * 100;

  // Insert data into the database.
  try {
    await sql`
      INSERT INTO income (date, category_id, account_id, amount, notes, status)
      VALUES (${date}, ${categoryId}, ${accountId}, ${amountInCents}, ${notes}, ${status})
    `;

    updateBalance(accountId, 'add', amountInCents);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { 
      message: 'Database Error: Failed to Create Income.'
    };
  }

  // Revalidate the cache for the income page and redirect the user.
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/income');
  
  redirect('/dashboard/income');
}

export async function updateIncome(id: string, formData: FormData) {
  const { date, categoryId, accountId, amount, notes, status } = UpdateIncome.parse({
    date: formData.get('date'),
    categoryId: formData.get('categoryId'),
    accountId: formData.get('accountId'),
    amount: formData.get('amount'),
    notes: formData.get('notes'),
    status: formData.get('status') ? "true" : "false",
  });
 
  const amountInCents = amount * 100;
  const formattedDate = formatDateToLocal(date);

  try {
    await sql`
      UPDATE income
      SET date = ${formattedDate}, category_id = ${categoryId}, account_id = ${accountId}, amount = ${amountInCents}, notes = ${notes}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Income.' };
  }
 
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/income');
  revalidatePath(`/dashboard/income/${id}/edit`);

  redirect('/dashboard/income');
}

export async function deleteIncome(id: string) {
  try {
    await sql`DELETE FROM income WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Income.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/income');

  redirect('/dashboard/income');
  return { message: 'Deleted Income.' };
}
