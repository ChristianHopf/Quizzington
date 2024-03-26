import React from "react";

function Header() {
  return (
    <header className="flex flex-row justify-between w-full max-w-[1600px] mt-4 mb-16 ">
      <h1 className="text-white text-4xl">Quizzington</h1>
      <div className="flex flex-row gap-6 items-center">
        <button className="text-gray-200 text-2xl">Log in</button>
        <button className="text-gray-200 text-2xl">Sign up</button>
      </div>
    </header>
  );
}

export default Header;
