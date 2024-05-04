"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

type Props = {};

function AuthButton({}: Props) {
  const { data: session } = useSession();

  if (session) {
    // Log out button
    return (
      <div className="flex flex-row gap-6">
        <button className="btn bg-white text-black px-4 py-2 rounded-2xl">
          <Link href={"/profile"}>My Quizzes</Link>
        </button>
        <button
          className="btn bg-white text-black px-4 py-2 rounded-2xl"
          onClick={() => signOut()}
        >
          Log out
        </button>
      </div>
    );
  }
  return (
    // Sign up button
    // <Link href="/api/auth/signin">
    <button
      className="text-black text-2xl"
      onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
    >
      Sign in
    </button>
    // </Link>
  );
}

export default AuthButton;
