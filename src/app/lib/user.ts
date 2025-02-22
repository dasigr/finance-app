import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { Token } from '@/app/lib/definitions'
import axios from 'axios'

export async function getToken(name: string, password: string) {
  try {
    const url = `${process.env.DRUPAL_API_URL}/oauth/token`

    const data = new URLSearchParams()
    data.append('grant_type', 'password')
    data.append('client_id', `${process.env.DRUPAL_CLIENT_ID}`)
    data.append('client_secret', `${process.env.DRUPAL_CLIENT_SECRET}`)
    data.append('username', `${name}`)
    data.append('password', `${password}`)
    data.append('scope', 'finance')

    const response = await axios.post(url, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

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
  const access_token = (<Token>token).access_token

  try {
    const url = `${process.env.DRUPAL_API_URL}/jsonapi`

    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + access_token
      }
    })

    return response.data.meta.links.me.meta.id
    
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
  const access_token = (<Token>token).access_token

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

export async function getCurrentUser() {
  const user_id = await getUserId()
  const current_user = await getUser(user_id)

  // console.log(current_user)
  return current_user
}

export async function registerUser(name: string, email: string, password: string) {
  const data = {
    "_links": {
      "type": {
        "href": `${process.env.DRUPAL_API_URL_INSECURE}/rest/type/user/user`
      }
    },
    "name": [
      {"value": `${name}`}
    ],
    "mail": [
      {"value": `${email}`}
    ],
    "pass": [
      {"value": `${password}`}
    ]
  }

  try {
    const url = `${process.env.DRUPAL_API_URL}/user/register`

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/hal+json',
        'Accept': 'application/hal+json'
      },
      params: {
        '_format': 'hal_json'
      }
    })

    // console.log('Register user', response)
    const user = response.data
    return user

  } catch (error: any) {
    console.error("Error registering user:", error.response?.data || error.message)
  }
}

export async function createUser(name: string, email: string, password: string) {
  // @TODO: Verify user is admin

  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
  
  if (!session || !payload) {
    return null
  }

  const token = payload.token
  const access_token = (<Token>token).access_token

  const role_id = `${process.env.ROLE_ID}`

  const data = {
    "data": {
      "type": "user--user",
      "attributes": {
        "name": `${name}`,
        "pass": {
          "value": `${password}`
        },
        "mail": `${email}`,
        "status": true
      },
      "relationships": {
        "roles": {
          "data": [
            {
              "type": "user_role--user_role",
              "id": `${role_id}`
            }
          ]
        }
      }
    }
  }

  try {
    const url = `${process.env.DRUPAL_API_URL}/jsonapi/user/user`

    const response = await axios.post(url, data, {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/vnd.api+json'
      }
    })

    const user = response.data
    return user

  } catch (error: any) {
    console.error("Error registering user:", error.response?.data || error.message)
  }
}
