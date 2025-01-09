'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { formatCurrency } from '../utils';

const FormSchema = z.object({
  id: z.string(),
  categoryId: z.string({
    invalid_type_error: 'Please select a category.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  date: z.string(),
});

const CreateBudget = FormSchema.omit({ id: true, date: true });
const UpdateBudget = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    categoryId?: string[];
    amount?: string[];
  };
  message?: string | null;
};

export async function createBudget(prevState: State, formData: FormData) {
  // Validate form using Zod.
  const validatedFields = CreateBudget.safeParse({
    categoryId: formData.get('categoryId'),
    amount: formData.get('amount'),
  });

  // If form validation fails, return errors clearly. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Budget.',
    };
  }

  // Prepare data for insertion ino the database.
  const { categoryId, amount } = validatedFields.data;
  const amountInCents = amount * 100;

  // Insert data into the database.
  try {
    await sql`
      INSERT INTO budget (category_id, amount)
      VALUES (${categoryId}, ${amountInCents})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { 
      message: 'Database Error: Failed to Create Budget.'
    };
  }

  // Revalidate the cache for the budget page and redirect the user.
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/budget');

  redirect('/dashboard/budget');
}

export async function updateBudget(id: string, formData: FormData) {
  const { categoryId, amount } = UpdateBudget.parse({
    categoryId: formData.get('categoryId'),
    amount: formData.get('amount'),
  });
 
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE budget
      SET category_id = ${categoryId}, amount = ${amountInCents}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Budget.' };
  }
 
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/budget');
  revalidatePath(`/dashboard/budget/${id}/edit`);

  redirect('/dashboard/budget');
}

export async function deleteBudget(id: string) {
  try {
    await sql`DELETE FROM budget WHERE id = ${id}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Budget.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/budget');

  redirect('/dashboard/budget');
  return { message: 'Deleted Budget.' };
}

export async function fetchTotalBudgetAmount() {
  try {
    const budgetStatusPromise = sql`
      SELECT
        SUM(amount) AS "amount"
      FROM budget
    `;

    const data = await Promise.all([
      budgetStatusPromise,
    ]);

    const totalBudgetAmount = formatCurrency(data[0].rows[0].amount ?? '0');

    return totalBudgetAmount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total budget.');
  }
}
