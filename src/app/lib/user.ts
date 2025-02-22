import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import axios from 'axios'

export async function getToken(name: string, password: string) {
  try {
    const url = `${process.env.DRUPAL_API_URL}/oauth/token`

    const data = new URLSearchParams()
    data.append('grant_type', 'password')
    data.append('client_id', `${process.env.DRUPAL_CLIENT_ID}`)
    data.append('client_secret', `${process.env.DRUPAL_CLIENT_SECRET}`)
    data.append('username', name)
    data.append('password', password)
    data.append('scope', 'finance')

    const response = await axios.post(url, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    // console.log('Access Token:', response.data.access_token)
    return response.data

  } catch (error: any) {
    console.error("Error fetching token:", error.response?.data || error.message)
  }
}

export async function getUserId() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
  
  if (!session || !payload) {
    return null
  }

  const token = payload.token
  const access_token = token.access_token

  try {
    const url = `${process.env.DRUPAL_API_URL}/jsonapi`

    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + access_token
      }
    })

    // console.log('User ID:', response.data.meta.links.me.meta.id)
    return response.data
    
  } catch (error: any) {
    console.error("Error fetching user:", error.response?.data || error.message)
  }
}

export async function getUser(user_id: string) {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }

  const token = payload.token
  const access_token = token.access_token

  try {
    const url = `${process.env.DRUPAL_API_URL}/jsonapi/user/user/${user_id}`

    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + access_token
      }
    })

    // console.log('User', response.data)
    return response.data
    
  } catch (error: any) {
    console.error("Error fetching user details:", error.response?.data || error.message)
  }
}
