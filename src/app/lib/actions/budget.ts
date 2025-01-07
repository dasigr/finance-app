'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
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
    customerId?: string[];
    amount?: string[];
  };
  message?: string | null;
};

export async function createBudget(prevState: State, formData: FormData) {
  // Validate form using Zod.
  const validatedFields = CreateBudget.safeParse({
    customerId: formData.get('customerId'),
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
  const { customerId, amount } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database.
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, date)
      VALUES (${customerId}, ${amountInCents}, ${date})
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
  const { customerId, amount } = UpdateBudget.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
  });
 
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/budget');
  revalidatePath(`/dashboard/budget/${id}/edit`);

  redirect('/dashboard/budget');
}

export async function deleteBudget(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/budget');

    redirect('/dashboard/budget');
    return { message: 'Deleted Budget.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Budget.' };
  }
}
