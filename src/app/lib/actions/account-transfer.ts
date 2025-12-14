'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchAccountById } from '../data';
import { createTransaction } from '@/app/lib/transaction';

const FormSchema = z.object({
  date: z.string({
    invalid_type_error: 'Please select a date.',
  }),
  fromAccountId: z.string(),
  toAccountId: z.string(),
  amount: z.coerce
    .number(),
});

const TransferAccountBalance = FormSchema;

export type State = {
  errors?: {
    date?: string[];
    fromAccountId?: string[];
    toAccountId?: string[];
    amount?: string[];
  };
  message?: string | null;
};

export async function transferAccountBalance(prevState: State, formData: FormData) {
  // Validate form using Zod.
  const validatedFields = TransferAccountBalance.safeParse({
    date: formData.get('date'),
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
  const { date, fromAccountId, toAccountId, amount } = validatedFields.data;
  const amountInCents = amount * 100;

  const userId = '410544b2-4001-4271-9855-fec4b6a6442a'; // Get userId from session.
  const type = 'transfer';
  const amount_n = amountInCents;
  const categoryId_n = '472b3cbe-4488-42a5-a942-e033dba62fdd'; // Set a transfer icon.
  const fromAccount = fetchAccountById(fromAccountId);
  const toAccount = fetchAccountById(toAccountId);
  const description = `Transfer from ${(await fromAccount).name} to ${(await toAccount).name}`;

  // Validate from balance.
  if ((await fromAccount).balance < amount) {
    return { message: 'Not enough balance.' };
  }

  // Update account balance in the database.
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
