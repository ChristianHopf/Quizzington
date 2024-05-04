import React from "react";
import { Quiz } from "@/app/types/quiz";
import Link from "next/link";

type Props = {
  data: Quiz;
};

function QuizCard({ data }: Props) {
  console.log(data);
  return (
    <div className="card bg-white rounded-lg shadow-lg px-4 py-6 w-96 flex flex-col items-center">
      <h1 className="card-title text-2xl">{data.title}</h1>
      <p className="mb-4">Questions: {data.length}</p>
      <div className="card-actions justify-end">
        <button className="btn">
          <Link href={`/quiz/${data.id}`}>Take Quiz</Link>
        </button>
      </div>
    </div>
  );
}

export default QuizCard;
