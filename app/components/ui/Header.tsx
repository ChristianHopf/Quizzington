import React from "react";
import Link from "next/link";
import AuthButton from "./AuthButton";

type Props = {};

function Header({}: Props) {
  return (
    <header className="flex flex-row justify-between w-full py-4 mb-16 bg-[#7209b7]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <h1 className="text-white text-3xl">Quizzington</h1>
          </Link>
          <div className="flex flex-row gap-6 items-center">
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
