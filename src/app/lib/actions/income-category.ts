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

const CreateIncomeCategory = FormSchema.omit({ id: true });
const UpdateIncomeCategory = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export async function createIncomeCategory(prevState: State, formData: FormData) {
  // Validate form using Zod.
  const validatedFields = CreateIncomeCategory.safeParse({
    name: formData.get('name'),
    image_url: formData.get('image_url'),
  });

  // If form validation fails, return errors clearly. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Income Category.',
    };
  }

  // Prepare data for insertion ino the database.
  const { name, image_url } = validatedFields.data;

  // Insert data into the database.
  try {
    await sql`
      INSERT INTO income_category (customer_id, amount, status, date)
      VALUES (${name}, ${image_url})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { 
      message: 'Database Error: Failed to Create Income Category.'
    };
  }

  // Revalidate the cache for the income categories page and redirect the user.
  revalidatePath('/settings/income-category');
  redirect('/settings/income-category');
}

export async function updateIncomeCategory(id: string, formData: FormData) {
  const { name, image_url } = UpdateIncomeCategory.parse({
    name: formData.get('name'),
    image_url: formData.get('image_url'),
  });

  try {
    await sql`
      UPDATE income_category
      SET name = ${name}, image_url = ${image_url}
      WHERE id = ${id}
    `;
  } catch (error) {
    // return { message: 'Database Error: Failed to Update Income Category.' };
  }
 
  revalidatePath('/settings/income-category');
  redirect('/settings/income-category');
}

export async function deleteIncomeCategory(id: string) {
  try {
    await sql`DELETE FROM income_category WHERE id = ${id}`;
  } catch (error) {
    // return { message: 'Database Error: Failed to Delete Income Category.' };
  }

  revalidatePath('/settings/income-category');
  // return { message: 'Deleted Income Category.' };
}
