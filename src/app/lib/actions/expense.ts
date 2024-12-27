'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
  status: z.string({
    invalid_type_error: 'Please select an expense status.',
  }),
});

const CreateExpense = FormSchema.omit({ id: true });
const UpdateExpense = FormSchema.omit({ id: true });

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

export async function createExpense(prevState: State, formData: FormData) {
  // Validate form using Zod.
  const validatedFields = CreateExpense.safeParse({
    date: formData.get('date'),
    categoryId: formData.get('categoryId'),
    accountId: formData.get('accountId'),
    amount: formData.get('amount'),
    notes: formData.get('notes'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors clearly. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Expense.',
    };
  }

  // Prepare data for insertion ino the database.
  const { date, categoryId, accountId, amount, notes, status } = validatedFields.data;
  const amountInCents = amount * 100;
  // const date = new Date().toISOString().split('T')[0];

  // Insert data into the database.
  try {
    await sql`
      INSERT INTO expense (date, category_id, account_id, amount, notes, status)
      VALUES (${date}, ${categoryId}, ${accountId}, ${amountInCents}, ${notes}, ${status})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { 
      message: 'Database Error: Failed to Create Expense.'
    };
  }

  // Revalidate the cache for the expense page and redirect the user.
  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
}

export async function updateExpense(id: string, formData: FormData) {
  const { date, categoryId, accountId, amount, notes, status } = UpdateExpense.parse({
    date: formData.get('date'),
    categoryId: formData.get('categoryId'),
    accountId: formData.get('accountId'),
    amount: formData.get('amount'),
    notes: formData.get('notes'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE expense
      SET date = ${date}, category_id = ${categoryId}, account_id = ${accountId}, amount = ${amountInCents}, notes = ${notes}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Expense.' };
  }
 
  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
}

export async function deleteExpense(id: string) {
  try {
    await sql`DELETE FROM expense WHERE id = ${id}`;
    revalidatePath('/dashboard/expenses');
    return { message: 'Deleted Expense.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Expense.' };
  }
}
