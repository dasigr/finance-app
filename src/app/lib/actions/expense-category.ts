'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter category name.',
  }),
  image_url: z.string({
    invalid_type_error: 'Please enter category name.',
  }),
});

const CreateExpenseCategory = FormSchema.omit({ id: true });
const UpdateExpenseCategory = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod.
  const validatedFields = CreateExpenseCategory.safeParse({
    name: formData.get('name'),
    image_url: formData.get('image_url'),
  });

  // If form validation fails, return errors clearly. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion ino the database.
  const { name, image_url } = validatedFields.data;

  // Insert data into the database.
  try {
    await sql`
      INSERT INTO expense_category (customer_id, amount, status, date)
      VALUES (${name}, ${image_url})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { 
      message: 'Database Error: Failed to Create Invoice.'
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/settings');
  redirect('/settings');
}

export async function updateExpenseCategory(id: string, formData: FormData) {
  const { name, image_url } = UpdateExpenseCategory.parse({
    name: formData.get('name'),
    image_url: formData.get('image_url'),
  });

  try {
    await sql`
      UPDATE expense_category
      SET name = ${name}, image_url = ${image_url}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Expense Category.' };
  }
 
  revalidatePath('/settings');
  redirect('/settings');
}

export async function deleteExpenseCategory(id: string) {
  try {
    await sql`DELETE FROM expense_category WHERE id = ${id}`;
    revalidatePath('/settings');
    return { message: 'Deleted Expense Category.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Expense Category.' };
  }
}
