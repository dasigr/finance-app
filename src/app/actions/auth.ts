'use server'

import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/definitions'
import { createSession, deleteSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import { getToken, getUserId } from '@/app/lib/user'

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data
  // e.g. Hash the user's password before storing it
  // const hashedPassword = await bcrypt.hash(password, 10)
 
  // 3. Insert the user into the database
  // const data = await db
  //   .insert(users)
  //   .values({
  //     name,
  //     email,
  //     password: hashedPassword,
  //   })
  //   .returning({ id: users.id })
 
  // const user = data[0]
 
  // if (!user) {
  //   return {
  //     message: 'An error occurred while creating your account.',
  //   }
  // }

  // 3. Call the Auth provider
  console.log('Call Auth API')
  const user = {
    id: '1234-5678'
  }

  // 4. Create user session
  await createSession(user.id)

  // 5. Redirect user
  redirect('/dashboard')
}

export async function login(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    name: formData.get('name'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Prepare data
  const { name, password } = validatedFields.data

  // 3. Call the Auth provider
  const token = await getToken(name, password)

  // const user = await getUserId()
  // const user_id = user.meta.links.me.meta.id

  // 4. Create user session
  await createSession(token)

  // 5. Redirect user
  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
