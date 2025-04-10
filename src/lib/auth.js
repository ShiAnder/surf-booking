import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // For JWT strategy, we need to handle both jwt and session callbacks
    async jwt({ token, user }) {
      // If user exists (first sign in), add the user id to the token
      if (user) {
        token.id = user.id;
      }
      // Return the token so it's passed to the session callback
      return token;
    },
    async session({ session, token }) {
      // Add user ID from token to the session
      if (session.user) {
        session.user.id = token.id;
        
        // Get the stripe customer ID if it exists
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
          select: { stripeCustomerId: true }
        });
        
        if (dbUser?.stripeCustomerId) {
          session.user.stripeCustomerId = dbUser.stripeCustomerId;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};