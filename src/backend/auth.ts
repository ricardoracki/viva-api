import { DefaultSession, NextAuthOptions, getServerSession } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/database/client'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User
  }
}

export type User = {
  id: string
  username: string
} & DefaultSession['user']

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: ({ token, user }) => {
      const customUser = user as any

      if (user) {
        console.log('customUser', customUser)
        return {
          ...user,
          id: customUser.id,
          username: customUser.username,
          image: customUser.image,
        }
      }
      return token
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          image: token.image,
        },
      } as any
    },
  },
  pages: {
    signIn: '/public/login',
  },

  // jwt: {
  //   maxAge:
  // },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'username' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null
          }
          const user = await db.users.findFirst({
            select: {
              id: true,
              username: true,
              password: true,
              name: true,
              email: true,
              image: true,
            },
            where: {
              username: credentials.username,
            },
          })

          if (!user || !bcrypt.compareSync(credentials.password, user.password))
            return null

          const { password, ...userData } = user

          return userData
        } catch (error) {
          return null
        }
      },
    }),
  ],
}

export const getServerAuthSession = () => getServerSession(authOptions)
