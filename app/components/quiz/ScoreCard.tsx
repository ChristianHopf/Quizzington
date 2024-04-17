"use client";

import React, { useState } from "react";
import { Quiz } from "@/app/types/quiz";
import { UserQuiz } from "@/app/types/userquiz";
import ReviewQuestion from "./ReviewQuestion";

type Props = {
  quiz: UserQuiz;
  score: number[];
  questionChoices: (number | null)[];
  onRetakeQuiz: () => void;
};

function ScoreCard({ quiz, score, questionChoices, onRetakeQuiz }: Props) {
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  console.log(score);

  function handleSelectQuestion(question: number) {
    setSelectedQuestion(question);
  }

  const percentage = Math.round(
    (score.filter((s) => s === 1).reduce((sum, n) => sum + n, 0) /
      score.length) *
      100
  );
  const incorrectAnswers = score
    .map((n, i) => (n === 0 ? i : null))
    .filter((n) => n !== null);

  const correctAnswers = score
    .map((n, i) => (n === 1 ? i : null))
    .filter((n) => n !== null);

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg px-8 py-6 mt-6">
      {/* Score percentage */}
      <h1 className="text-3xl text-center mb-6">Your score: {percentage}%</h1>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-48">
          <div className="flex flex-col gap-4 mb-4">
            {/* Incorrect questions */}
            {incorrectAnswers.length > 0 && (
              <>
                <h2 className="text-2xl mx-auto mb-2 text-center">
                  Incorrect answers
                </h2>
                {incorrectAnswers.map((question, index) => (
                  <button
                    key={index}
                    className={`text-lg rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-black ${
                      selectedQuestion === question
                        ? "bg-gray-200 text-black"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectQuestion(question ? question : 0);
                    }}
                  >
                    Question {question !== null ? question + 1 : ""}
                  </button>
                ))}
              </>
            )}
            {correctAnswers.length > 0 && (
              <>
                <h2 className="text-2xl mx-auto mb-2 text-center">
                  Correct answers
                </h2>
                {correctAnswers.map((question, index) => (
                  <button
                    key={index}
                    className={`text-lg rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-black ${
                      selectedQuestion === question
                        ? "bg-gray-200 text-black"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      // This shouldn't ever be a problem.
                      // If this renders there is at least 1 correct question.
                      // I just don't know ho to fix the type error
                      handleSelectQuestion(question ? question : 0);
                    }}
                  >
                    Question {question !== null ? question + 1 : ""}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
        {quiz && (
          <div className="w-full lg:pl-8">
            <ReviewQuestion
              data={quiz.Question[selectedQuestion]}
              index={selectedQuestion}
              correct={score[selectedQuestion] === 1}
              selectedChoice={questionChoices[selectedQuestion]}
            />
          </div>
        )}
      </div>
      {/* Retake quiz button */}
      <div className="flex justify-end mt-6">
        <button
          className="bg-[#7209b7] text-white rounded-lg px-6 py-3 hover:bg-purple-800 focus:outline-none focus:bg-purple-800"
          onClick={onRetakeQuiz}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}

export default ScoreCard;
