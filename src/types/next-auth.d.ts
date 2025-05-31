// src/types/next-auth.d.ts
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      stripeCustomerId?: string | null
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    stripeCustomerId?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    stripeCustomerId?: string | null
  }
}