'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { formatDateToLocal, formatCurrency } from '../utils';
import { fetchExpenseById } from '../data';
import { updateBalance } from './account';
import { ExpenseForm } from '../definitions';
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
    status: formData.get('status') ? "true" : "false",
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

  const userId = '410544b2-4001-4271-9855-fec4b6a6442a'; // Get userId from session.
  const type = 'expense';
  const amount_n = amountInCents;
  const categoryId_n = categoryId;
  const fromAccountId = accountId;
  const toAccountId = undefined;
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
      message: 'Database Error: Failed to Create Expense.'
    };
  }

  // Revalidate the cache for the expense page and redirect the user.
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/expenses');
  revalidatePath('/dashboard/account');
  revalidatePath(`/dashboard/account/${accountId}/edit`);
  revalidatePath('/dashboard/budget');
  
  redirect('/dashboard/expenses');
}

export async function updateExpense(id: string, formData: FormData) {
  // Get previous expense data.
  const data = await sql`
    SELECT
      transaction.id,
      transaction.date,
      transaction.amount,
      transaction.description,
      category.id AS "category_id",
      account.id AS "account_id"
    FROM transaction
    JOIN category ON transaction.category_id = category.id
    JOIN account ON transaction.from_account_id = account.id
    WHERE transaction.id = ${id};
  `;

  const expense = data.rows.map((expense) => ({
    ...expense,
    // Convert amount from cents to dollars
    amount: expense.amount / 100,
  }));
  
  const prevAmount = expense[0].amount;

  const { date, categoryId, accountId, amount, notes, status } = UpdateExpense.parse({
    date: formData.get('date'),
    categoryId: formData.get('categoryId'),
    accountId: formData.get('accountId'),
    amount: formData.get('amount'),
    notes: formData.get('notes'),
    status: formData.get('status') ? "true" : "false",
  });

  // Prepare account balance.
  const amountChanged = prevAmount - amount;

  // Convert amount in cents before saving to the database.
  const amountInCents = amount * 100;

  const userId = '410544b2-4001-4271-9855-fec4b6a6442a'; // Get userId from session.
  const type = 'expense';
  const amount_n = amountInCents;
  const categoryId_n = categoryId;
  const fromAccountId = accountId;
  const toAccountId = undefined;
  const description = notes;

  try {
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

    // Update account balance.
    updateBalance(accountId, 'add', amountChanged);
  } catch (error) {
    // return { message: 'Database Error: Failed to Update Expense.' };
  }
 
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/expenses');
  revalidatePath(`/dashboard/expenses/${id}/edit`);
  revalidatePath('/dashboard/account');
  revalidatePath(`/dashboard/account/${accountId}/edit`);
  revalidatePath('/dashboard/budget');

  redirect('/dashboard/expenses');
}

export async function deleteExpense(id: string) {
  // Get previous expense data.
  const expense = fetchExpenseById(id);
  const accountId = (await expense).account_id;
  const amount = (await expense).amount;

  try {
    await sql`DELETE FROM transaction WHERE id = ${id} AND type = 'expense'`;

    // Update account balance.
    updateBalance(accountId, 'add', amount);
  } catch (error) {
    // return { message: 'Database Error: Failed to Delete Expense.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/expenses');
  revalidatePath('/dashboard/account');
  revalidatePath(`/dashboard/account/${accountId}/edit`);
  revalidatePath('/dashboard/budget');

  redirect('/dashboard/expenses');
  // return { message: 'Deleted Expense.' };
}

export async function fetchTotalPorftfolioAmount() {
  try {
    const data = await sql`
      SELECT
        SUM(amount) AS "amount"
      FROM portfolio;
    `;

    const expense = data.rows.map((transaction) => ({
      ...transaction,
      // Convert amount from cents to dollars
      amount: transaction.amount,
    }));

    return expense[0].amount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total portfolios.');
  }
}

export async function fetchFutureExpenseAmount() {
  try {
    const data = await sql`
      SELECT
        SUM(amount) AS "amount"
      FROM expense
      WHERE DATE_TRUNC('month', expense.date) > DATE_TRUNC('month', CURRENT_DATE)
    `;

    const expense = data.rows.map((expense) => ({
      ...expense,
      // Convert amount from cents to dollars
      amount: expense.amount,
    }));

    return expense[0].amount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total expenses.');
  }
}

export async function fetchTotalExpenseAmountByCategoryId(categoryId: string) {
  try {
    const data = await sql`
      SELECT
        SUM(amount) AS "amount"
      FROM transaction
      WHERE transaction.category_id = ${categoryId}
      AND DATE_TRUNC('month', transaction.date) = DATE_TRUNC('month', CURRENT_DATE)
    `;

    const expense = data.rows.map((expense) => ({
      ...expense,
      // Convert amount from cents to dollars
      amount: expense.amount / 100,
    }));

    return expense[0].amount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total expenses.');
  }
}

export async function fetchFutureExpenseAmountByCategoryId(categoryId: string) {
  try {
    const data = await sql`
      SELECT
        SUM(amount) AS "amount"
      FROM transaction
      WHERE transaction.category_id = ${categoryId}
      AND DATE_TRUNC('month', transaction.date) > DATE_TRUNC('month', CURRENT_DATE)
    `;

    const expense = data.rows.map((expense) => ({
      ...expense,
      // Convert amount from cents to dollars
      amount: expense.amount / 100,
    }));

    return expense[0].amount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total expenses.');
  }
}
