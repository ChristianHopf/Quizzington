import { UserQuiz } from "@/app/types/userquiz";
import React from "react";
import Link from "next/link";

type Props = {
  quizzes: UserQuiz[];
};

function QuizList({ quizzes }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {quizzes.map((quiz, index) => (
        <div
          key={index}
          className="flex flex-row items-start justify-between bg-white rounded-lg shadow-lg px-8 py-6"
        >
          <div className="flex flex-col">
            <h1 className="text-xl mb-2">{quiz?.title}</h1>
            <p className="text-gray-400">Questions: {quiz?.Question.length}</p>
          </div>
          <div className="flex flex-row gap-4">
            <button className=" bg-white">Edit</button>
            <Link href={`/quiz/${quiz?.id}`}>
              <button className="btn  rounded-2xl px-4 py-2 hover:bg-[#7209b7] hover:text-white">Take</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuizList;
