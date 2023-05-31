// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";

export function Providers({ children }) {
  const { data: session } = useSession();
  // console.log(session);

  let pageContent = !session ? (
    <main className="bg-blue-900 w-screen h-screen flex items-center">
      <div className="text-center w-full">
        <button
          className="bg-white p-2 px-4 rounded-lg"
          onClick={() => signIn("google")}
        >
          Login with Google
        </button>
      </div>
    </main>
  ) : (
    children
  );

  return (
    <CacheProvider>
      <ChakraProvider>{pageContent}</ChakraProvider>
    </CacheProvider>
  );
}
