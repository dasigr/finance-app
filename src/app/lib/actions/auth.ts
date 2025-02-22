'use server'

import { SignupFormSchema, LoginFormSchema, FormState } from '@/app/lib/definitions'
import { createSession, deleteSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'

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
  let token
  try {
    let formData = new FormData()
    formData.append('grant_type', 'password')
    formData.append('client_id', `${process.env.DRUPAL_CLIENT_ID}`)
    formData.append('client_secret', `${process.env.DRUPAL_CLIENT_SECRET}`)
    formData.append('username', name)
    formData.append('password', password)
    formData.append('scope', 'finance')

    const res = await fetch(`${process.env.DRUPAL_API_URL}/oauth/token`, {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
      }),
      body: formData,
    })

    token = await res.json()
    // console.log(token)

  } catch (error) {
    console.log(error)
  }

  let user_id
  try {
    const res = await fetch(`${process.env.DRUPAL_API_URL}/jsonapi`, {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + token.access_token
      }),
    })

    const content = await res.json()
    user_id = content.meta.links.me.meta.id
    
  } catch (error) {
    console.log(error)
  }

  // 4. Create user session
  await createSession(user_id)

  // 5. Redirect user
  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
