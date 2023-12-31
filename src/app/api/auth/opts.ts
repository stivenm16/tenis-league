import db from '@/libs/prisma'
import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password', placeholder: '*****' },
      },
      async authorize(credentials, req) {
        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!userFound) throw new Error('No user found')

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password,
        )

        if (!matchPassword) throw new Error('Wrong password')

        return {
          id: userFound.id,
          name: userFound.userName,
          email: userFound.email,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile }) {
      if (user) token.user = user
      return token
    },
    async session({ session, user }) {
      const userFound = await db.user.findUnique({
        where: {
          email: session.user.email,
        },
      })
      session.user.role = userFound.role
      session.user.userId = userFound.id
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}
