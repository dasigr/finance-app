'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { formatDateToLocal } from '../utils';
import { fetchAccountById, fetchExpenseById } from '../data';
import { updateBalance } from './account';
import { ExpenseForm } from '../definitions';

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

  // Insert data into the database.
  try {
    await sql`
      INSERT INTO expense (date, category_id, account_id, amount, notes, status)
      VALUES (${date}, ${categoryId}, ${accountId}, ${amountInCents}, ${notes}, ${status})
    `;

    // Update account balance.
    updateBalance(accountId, 'subtract', amountInCents);
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
  // Get previous expense data.
  const data = await sql<ExpenseForm>`
    SELECT
      expense.id,
      expense.date,
      expense.amount,
      expense.notes,
      expense.status,
      expense_category.id AS "category_id",
      account.id AS "account_id"
    FROM expense
    JOIN expense_category ON expense.category_id = expense_category.id
    JOIN account ON expense.account_id = account.id
    WHERE expense.id = ${id};
  `;

  const expense = data.rows.map((expense) => ({
    ...expense,
    // Convert amount from cents to dollars
    amount: expense.amount / 100,
  }));
  
  const prevAmountInCents = expense[0].amount * 100;
  console.log("prevAmountInCents");
  console.log(prevAmountInCents);

  //

  const { date, categoryId, accountId, amount, notes, status } = UpdateExpense.parse({
    date: formData.get('date'),
    categoryId: formData.get('categoryId'),
    accountId: formData.get('accountId'),
    amount: formData.get('amount'),
    notes: formData.get('notes'),
    status: formData.get('status') ? "true" : "false",
  });
 
  const amountInCents = amount * 100;
  const formattedDate = formatDateToLocal(date);
  console.log("newAmountInCents");
  console.log(amountInCents);

  // Prepare account balance.
  const balanceInCents = prevAmountInCents - amountInCents;
  console.log("balanceInCents");
  console.log(balanceInCents);

  try {
    await sql`
      UPDATE expense
      SET date = ${formattedDate}, category_id = ${categoryId}, account_id = ${accountId}, amount = ${amountInCents}, notes = ${notes}, status = ${status}
      WHERE id = ${id}
    `;

    // Update account balance.
    updateBalance(accountId, 'add', balanceInCents);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Expense.' };
  }
 
  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
}

export async function deleteExpense(id: string) {
  // Prepare account balance.
  const expense = fetchExpenseById(id);
  const accountId = (await expense).account_id;
  const amountInCents = (await expense).amount * 100;

  try {
    await sql`DELETE FROM expense WHERE id = ${id}`;

    // Update account balance.
    updateBalance(accountId, 'add', amountInCents);
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Expense.' };
  }

  revalidatePath('/dashboard/expenses');
  redirect('/dashboard/expenses');
  // return { message: 'Deleted Expense.' };
}
