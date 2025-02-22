import 'server-only'

import axios from 'axios'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  // console.log('Session', session)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async () => {
  const access_token = `${process.env.ACCESS_TOKEN}`

  const session = await verifySession()
  if (!session) return null

  try {
    const url = `${process.env.DRUPAL_API_URL}/jsonapi/user/user/${session.userId}`

    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + access_token
      }
    })

    const user = response.data
    return user

  } catch (error) {
    console.log('Failed to fetch user')
    return null
  }
})
