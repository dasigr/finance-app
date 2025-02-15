'use server';

import axios from 'axios';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

async function getAuth(username: string, password: string) {
  const params = new URLSearchParams();
  params.append('grant_type',  'password');
  params.append('client_id', `${process.env.DRUPAL_CLIENT_ID}`);
  params.append('client_secret', `${process.env.DRUPAL_CLIENT_SECRET}`);
  params.append('username', username);
  params.append('password', password);

  try {
    const response = await axios.post(`${process.env.DRUPAL_API_URL}/oauth/token`, params);
    return response.data;
  } catch (error) {
    throw new Error('Failed to authenticate user.');
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // const user = await getUser(email);
          // if (!user) return null;

          // const passwordsMatch = await bcrypt.compare(password, user.password);
          // if (passwordsMatch) return user;

          // Authenitcate.
          const userData = await getAuth(email, password);
          return userData;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
