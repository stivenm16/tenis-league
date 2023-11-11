// nextauth.d.ts
export enum UserRole {
  user = 'user',
  admin = 'admin',
}

declare module 'next-auth' {
  interface User {
    role?: Role
    email: string
  }

  interface Session extends DefaultSession {
    user?: User
  }
}
