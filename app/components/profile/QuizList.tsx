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
          <div className="flex flex-row items-center gap-2">
            <Link href={`/quiz/${quiz?.id}`}>
              <button className="bg-[#b457f1] text-white rounded-lg px-4 py-2 hover:bg-[#7209b7] focus:outline-none focus:bg-[#7209b7]">
                Take
              </button>
            </Link>

            <button className="bg-[#b457f1] text-white rounded-lg px-4 py-2 hover:bg-[#7209b7] focus:outline-none focus:bg-[#7209b7]">
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuizList;
