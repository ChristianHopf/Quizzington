"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {};

function AuthButton({}: Props) {
  const { data: session } = useSession();

  if (session) {
    // Log out button
    return (
      <button className="text-gray-200 text-2xl" onClick={() => signOut()}>
        Log out
      </button>
    );
  }
  return (
    // Sign up button
    // <Link href="/api/auth/signin">
    <button
      className="text-gray-200 text-2xl"
      onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
    >
      Sign in
    </button>
    // </Link>
  );
}

export default AuthButton;
