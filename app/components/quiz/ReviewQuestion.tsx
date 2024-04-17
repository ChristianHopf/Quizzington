import React from "react";
import { UserQuestion } from "@/app/types/userquestion";

type Props = {
  data: UserQuestion;
  index: number;
  correct: boolean;
  selectedChoice: number | null;
};

function ReviewQuestion({ data, index, correct, selectedChoice }: Props) {
  const correctStyles = correct ? "border-green-600" : "border-red-400";

  return (
    <div className="flex w-full flex-col items-center">
      <p className="text-xl mb-4 max-h-48 overflow-auto">{data.text}</p>
      {/* Unanswered questions are incorrect, no choice is selected */}
      {selectedChoice === null && (
        <p className="text-xl text-red-500 mb-4 max-h-48 overflow-auto">
          Question was not answered
        </p>
      )}
      {data.type === "multiple_choice" ? (
        // Multiple Choice
        data.Choice.map((choice, i) => (
          <button
            key={i}
            className={`w-full text-left rounded border-2 border-gray-200 px-4 py-2 mb-2 ${
              selectedChoice === i ? correctStyles : ""
            }`}
            disabled
          >
            {choice.text}
          </button>
        ))
      ) : (
        // True or False
        <div className="w-full flex flex-col">
          <button
            key="trueButton"
            className={`text-xl w-24 rounded border-2 border-gray-200 px-4 py-2 mb-2 ${
              selectedChoice === 1 ? correctStyles : ""
            }`}
            disabled
          >
            True
          </button>
          <button
            key="falseButton"
            className={`text-xl w-24 rounded border-2 border-gray-200 px-4 py-2 mb-2 ${
              selectedChoice === 0 ? correctStyles : ""
            }`}
            disabled
          >
            False
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewQuestion;
