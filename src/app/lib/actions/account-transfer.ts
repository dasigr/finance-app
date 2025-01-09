'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchAccountById } from '../data';
import { AccountForm } from '../definitions';

const FormSchema = z.object({
  fromAccountId: z.string(),
  toAccountId: z.string(),
  amount: z.coerce
    .number(),
});

const TransferAccountBalance = FormSchema;

export type State = {
  errors?: {
    fromAccountId?: string[];
    toAccountId?: string[];
    amount?: string[];
  };
  message?: string | null;
};

export async function transferAccountBalance(prevState: State, formData: FormData) {
  // Validate form using Zod.
  const validatedFields = TransferAccountBalance.safeParse({
    fromAccountId: formData.get('fromAccountId'),
    toAccountId: formData.get('toAccountId'),
    amount: formData.get('amount'),
  });

  // If form validation fails, return errors clearly. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Account.',
    };
  }

  // Prepare data for insertion ino the database.
  const { fromAccountId, toAccountId, amount } = validatedFields.data;

  const fromAccount = fetchAccountById(fromAccountId);
  const fromAccountAmount = (await fromAccount).balance - amount;
  const fromAccountAmountInCents = fromAccountAmount * 100;

  const toAccount = fetchAccountById(toAccountId);
  const toAccountAmount = (await toAccount).balance + amount;
  const toAccountAmountInCents = toAccountAmount * 100;

  // Validate from balance.
  if ((await fromAccount).balance < amount) {
    return { message: 'Not enough balance.' };
  }

  // Update account balance in the database.
  try {
    await sql`
      UPDATE account
      SET balance = ${fromAccountAmountInCents}
      WHERE id = ${fromAccountId}
    `;

    await sql`
      UPDATE account
      SET balance = ${toAccountAmountInCents}
      WHERE id = ${toAccountId}
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { 
      message: 'Database Error: Failed to transfer account balance.'
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/account');
  revalidatePath(`/dashboard/account/${fromAccountId}/edit`);
  revalidatePath(`/dashboard/account/${toAccountId}/edit`);

  redirect('/dashboard/account');
}
