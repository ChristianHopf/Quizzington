import React from "react";
import { UserQuestion } from "@/app/types/userquestion";

type Props = {
  data: UserQuestion;
  index: number;
  selectedChoice: number | null;
};

function IncorrectQuestion({ data, index, selectedChoice }: Props) {
  // console.log(data);
  return (
    <div className="flex w-full flex-col items-center">
      <p className="text-xl mb-4 max-h-48 overflow-auto">
        Sample text sample text sample text sample text sample text sample text
        sample text sample text sample text sample text sample text sample text
        sample text sample text sample text sample text sample text sample text
        sample text
      </p>
      {data.choices ? (
        // Multiple Choice
        data.choices.map((choice, i) => (
          <button
            key={i}
            className={`w-full text-left rounded border-2 border-gray-200 px-4 py-2 mb-2 ${
              selectedChoice === i ? "border-red-400" : ""
            }`}
            disabled
          >
            {choice}
          </button>
        ))
      ) : (
        // True or False
        <div className="w-full flex flex-col">
          <button
            key="trueButton"
            className={`text-xl w-24 rounded border-2 border-gray-200 px-4 py-2 mb-2 ${
              selectedChoice === 1 ? "border-red-400" : ""
            }`}
            disabled
          >
            True
          </button>
          <button
            key="falseButton"
            className={`text-xl w-24 rounded border-2 border-gray-200 px-4 py-2 mb-2 ${
              selectedChoice === 0 ? "border-red-400" : ""
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

export default IncorrectQuestion;
