import React from "react";
import { Quiz } from "@/app/types/quiz";
import Link from "next/link";

type Props = {
  data: Quiz;
};

function QuizCard({ data }: Props) {
  return (
    <Link
      href={`/quiz/${data.id}`}
      className="bg-[#7209b7] rounded-lg shadow-lg px-4 py-2 w-1/5 flex flex-col items-center"
    >
      <h1 className="text-white text-2xl">{data.title}</h1>
      <p className="text-white">Questions: {data.length}</p>
    </Link>
  );
}

export default QuizCard;
