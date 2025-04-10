"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return (
      <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full font-semibold shadow-md cursor-not-allowed">
        Loading...
      </button>
    );
  }

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Sign In with Google
    </button>
  );
}
