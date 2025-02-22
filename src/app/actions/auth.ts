'use server'

import { SignupFormSchema, LoginFormSchema, FormState, SessionPayload } from '@/app/lib/definitions'
import { createSession, deleteSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import { getCurrentUser, getToken, registerUser } from '@/app/lib/user'

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

  // 3. Call the Auth provider
  const user = await registerUser(name, email, password)
 
  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }

  // 4. Create user session
  // await createSession(user.id)

  // 5. Redirect user
  console.log('Successfully registered an account')
  redirect('/login')
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

  const payload = {
    token: token,
    data: await getCurrentUser()
  }

  // 4. Create user session
  // console.log('Payload', payload)
  await createSession(payload)

  // 5. Redirect user
  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
