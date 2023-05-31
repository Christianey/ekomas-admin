"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { SessionProvider, signOut } from "next-auth/react";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Providers>
            <div className="bg-blue-900 min-h-screen flex">
              <Nav />
              <div className="bg-white flex-grow rounded-lg mt-2 mr-2 mb-2 p-4">
                {children}
              </div>
            </div>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
