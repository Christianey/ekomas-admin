"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  if (!session) return;

  return (
    <>
      <button
        className="bg-blue-900 text-white p-2 px-4 rounded-lg "
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <div className="text-blue-900 flex justify-between items-center">
        <h2>Hello, {session.user.name}</h2>
        <Image
          src={session.user.image}
          width={50}
          height={50}
          alt="user image"
          className="rounded-full"
        />
      </div>
    </>
  );
}
