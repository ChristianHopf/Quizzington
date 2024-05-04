import React from "react";
import Link from "next/link";

type Props = {};

function HomeInfo({}: Props) {
  return (
    <div className="flex flex-col items-center py-4">
      <h1 className="text-black font-bold text-5xl mb-8 max-w-4xl text-center">
        A quick, easy way to share quizzes with your friends!
      </h1>
      <Link href={"/create"}>
        <button className="btn text-black text-xl rounded-2xl bg-white hover:bg-[#7209b7] hover:text-white">
          Click here to get started
        </button>
      </Link>
    </div>
  );
}

export default HomeInfo;
