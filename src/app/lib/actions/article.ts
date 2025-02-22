'use server'

import axios from "axios"

export async function handleLogin() {
  const username = 'dasigr'
  const password = 'MvpEmpcLDDX2UZ6'

  const params = new URLSearchParams()
  params.append('grant_type',  'password')
  params.append('client_id', `${process.env.DRUPAL_CLIENT_ID}`)
  params.append('client_secret', `${process.env.DRUPAL_CLIENT_SECRET}`)
  params.append('username', username)
  params.append('password', password)

  try {
    const response = await axios.post(`${process.env.DRUPAL_API_URL}/oauth/token`, params)
    console.log("Token:", response.data)
  } catch (error) {
    throw error;
  }
}

export async function getArticles() {
  try {
    const res = await fetch(`${process.env.DRUPAL_API_URL}/jsonapi/node/article`, {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
      }),
    })

    const content = await res.json()
    return content.data

  } catch (error) {
    // console.log(error)
  }
}
