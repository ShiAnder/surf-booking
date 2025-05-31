// lib/auth.ts
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";

// Define custom types to avoid 'any'
interface ExtendedToken {
  id?: string;
  stripeCustomerId?: string | null;
  [key: string]: unknown;
}

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  stripeCustomerId?: string | null;
}

interface ExtendedSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    stripeCustomerId?: string | null;
  };
  expires: string;
}

// Validate environment variables
const requiredEnvVars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
};

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // For JWT strategy, we need to handle both jwt and session callbacks
    async jwt({ token, user }: { token: ExtendedToken; user?: ExtendedUser }) {
      // If user exists (first sign in), add the user id to the token
      if (user) {
        token.id = user.id;
        // You can also add stripeCustomerId to token if needed
        token.stripeCustomerId = user.stripeCustomerId;
      }
      // Return the token so it's passed to the session callback
      return token;
    },
    
    async session({ session, token }: { session: ExtendedSession; token: ExtendedToken }) {
      // Add user ID from token to the session
      if (session.user && token.id) {
        session.user.id = token.id;
        
        // Get the stripe customer ID if it exists
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id },
            select: { stripeCustomerId: true }
          });
          
          if (dbUser?.stripeCustomerId) {
            session.user.stripeCustomerId = dbUser.stripeCustomerId;
          }
        } catch (error) {
          console.error("Error fetching user data in session callback:", error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt" as const,
  },
};