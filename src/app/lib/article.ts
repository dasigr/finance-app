import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import axios from 'axios'

export async function getArticles() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
  
  if (!session || !payload) {
    return null
  }

  const token = payload.token
  const access_token = token.access_token

  try {
    const url = `${process.env.DRUPAL_API_URL}/jsonapi/node/article`

    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + access_token
      }
    })

    const content = response.data
    return content.data

  } catch (error) {
    console.log(error)
  }
}
