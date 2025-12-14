'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { formatDateToLocal, formatCurrency } from '../utils';
import { updateBalance } from './account';
import { fetchIncomeById } from '../data';
import { IncomeForm } from '../definitions';
import { createTransaction, updateTransaction } from '@/app/lib/transaction';

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

  const userId = '410544b2-4001-4271-9855-fec4b6a6442a'; // Get userId from session.
  const type = 'income';
  const amount_n = amountInCents;
  const categoryId_n = categoryId;
  const fromAccountId = undefined;
  const toAccountId = accountId;
  const description = notes;

  // Insert data into the database.
  try {
    await createTransaction({
      userId,
      type,
      amount_n,
      description,
      categoryId_n,
      fromAccountId,
      toAccountId,
      date
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { 
      message: 'Database Error: Failed to Create Income.'
    };
  }

  // Revalidate the cache for the income page and redirect the user.
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/income');
  revalidatePath('/dashboard/account');
  revalidatePath(`/dashboard/account/${accountId}/edit`);
  
  redirect('/dashboard/income');
}

export async function updateIncome(id: string, formData: FormData) {
  // Get previous expense data.
  const data = await sql<IncomeForm>`
    SELECT
      income.id,
      income.date,
      income.amount,
      income.notes,
      income.status,
      income_category.id AS "category_id",
      account.id AS "account_id"
    FROM income
    JOIN income_category ON income.category_id = income_category.id
    JOIN account ON income.account_id = account.id
    WHERE income.id = ${id};
  `;

  const income = data.rows.map((income) => ({
    ...income,
    // Convert amount from cents to dollars
    amount: income.amount / 100,
  }));
  
  const prevAmount = income[0].amount;

  const { date, categoryId, accountId, amount, notes, status } = UpdateIncome.parse({
    date: formData.get('date'),
    categoryId: formData.get('categoryId'),
    accountId: formData.get('accountId'),
    amount: formData.get('amount'),
    notes: formData.get('notes'),
    status: formData.get('status') ? "true" : "false",
  });

  // Prepare account balance.
  const amountChanged = amount - prevAmount;
 
  // Convert amount in cents before saving to the database.
  const amountInCents = amount * 100;

  const formattedDate = formatDateToLocal(date);

  const userId = '410544b2-4001-4271-9855-fec4b6a6442a'; // Get userId from session.
  const type = 'income';
  const amount_n = amountInCents;
  const categoryId_n = categoryId;
  const fromAccountId = undefined;
  const toAccountId = accountId;
  const description = notes;

  try {
    await sql`
      UPDATE income
      SET date = ${formattedDate}, category_id = ${categoryId}, account_id = ${accountId}, amount = ${amountInCents}, notes = ${notes}, status = ${status}
      WHERE id = ${id}
    `;

    // Update account balance.
    updateBalance(accountId, 'add', amountChanged);
    await updateTransaction({
      id,
      userId,
      type,
      amount_n,
      description,
      categoryId_n,
      fromAccountId,
      toAccountId,
      date
    });
  } catch (error) {
    // return { message: 'Database Error: Failed to Update Income.' };
  }
 
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/income');
  revalidatePath(`/dashboard/income/${id}/edit`);
  revalidatePath('/dashboard/account');
  revalidatePath(`/dashboard/account/${id}/edit`);

  redirect('/dashboard/income');
}

export async function deleteIncome(id: string) {
  // Prepare account balance.
  const income = fetchIncomeById(id);
  const accountId = (await income).account_id;
  const amount = (await income).amount;

  try {
    await sql`DELETE FROM income WHERE id = ${id}`;

    // Update account balance.
    updateBalance(accountId, 'subtract', amount);
  } catch (error) {
    // return { message: 'Database Error: Failed to Delete Income.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/income');
  revalidatePath('/dashboard/account');
  revalidatePath(`/dashboard/account/${accountId}/edit`);

  redirect('/dashboard/income');
  // return { message: 'Deleted Income.' };
}

export async function fetchTotalIncomeAmount() {
  try {
    const incomeStatusPromise = sql`
      SELECT
        SUM(amount) AS "amount"
      FROM transaction
      WHERE transaction.type = 'income'
      AND DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)
    `;

    const data = await Promise.all([
      incomeStatusPromise,
    ]);

    const totalIncomeAmount = formatCurrency(data[0].rows[0].amount ?? '0');

    return totalIncomeAmount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total income.');
  }
}
