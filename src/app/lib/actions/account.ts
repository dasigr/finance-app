'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { formatCurrency } from '../utils';
import { fetchAccountById } from '../data';
import { AccountForm } from '../definitions';

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

  const user_id = "410544b2-4001-4271-9855-fec4b6a6442a"
  const type = "bank"
  const currency = "PHP"

  // Insert data into the database.
  try {
    await sql`
      INSERT INTO account (user_id, name, type, balance, currency, weight, status)
      VALUES (${user_id}, ${name}, ${type}, ${amountInCents}, ${currency}, ${weight}, ${status})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { 
      message: 'Database Error: Failed to Create Account.'
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard');
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
    // return { message: 'Database Error: Failed to Update Account.' };
  }
 
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/account');
  revalidatePath(`/dashboard/account/${id}/edit`);

  redirect(`/dashboard/account/${id}/edit`);
}

export async function deleteAccount(id: string) {
  try {
    await sql`DELETE FROM account WHERE id = ${id}`;
  } catch (error) {
    // return { message: 'Database Error: Failed to Delete Account.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/account');

  redirect('/dashboard/account');
  // return { message: 'Deleted Account.' };
}

export async function updateBalance(id: string, operation: string, amount: number) {
  // Get current account balance.
  const data = await sql<AccountForm>`
    SELECT
      account.id,
      account.name,
      account.balance,
      account.weight,
      account.status
    FROM account
    WHERE account.id = ${id};
  `;

  const account = data.rows.map((account) => ({
    ...account,
    // Convert amount from cents to dollars
    balance: account.balance / 100,
  }));
  
  const currentBalance = account[0].balance;

  let newBalance = 0;
  if (operation == 'add') {
    newBalance = currentBalance + amount;
  } else {
    newBalance = currentBalance - amount;
  }

  const newBalanceInCents = newBalance * 100;

  try {
    await sql`
      UPDATE account
      SET balance = ${newBalanceInCents}
      WHERE id = ${id}
    `;

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/account');
    revalidatePath(`/dashboard/account/${id}/edit`);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Account.' };
  }
}

export async function fetchAccountBalance(account_id: string) {
  try {
    const accountStatusPromise = sql`
      SELECT
        SUM(balance) AS "balance"
      FROM account
      WHERE account.id = ${account_id}
      AND account.status = TRUE
    `;

    const data = await Promise.all([
      accountStatusPromise,
    ]);

    const totalAccountBalance = formatCurrency(data[0].rows[0].balance ?? '0');

    return totalAccountBalance;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total account balance.');
  }
}

export async function fetchTotalAccountBalance() {
  try {
    const accountStatusPromise = sql`
      SELECT
        SUM(balance) AS "balance"
      FROM account
      WHERE account.status = TRUE
    `;

    const data = await Promise.all([
      accountStatusPromise,
    ]);

    const totalAccountBalance = formatCurrency(data[0].rows[0].balance ?? '0');

    return totalAccountBalance;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total account balance.');
  }
}
