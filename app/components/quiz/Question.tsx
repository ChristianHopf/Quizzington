import React from "react";
import { UserQuestion } from "@/app/types/userquestion";

type Props = {
  data: UserQuestion;
  index: number;
  selectedChoice: number | null;
  onChangeChoice: (index: number) => void;
};

function Question({ data, index, selectedChoice, onChangeChoice }: Props) {
  // console.log(data);
  return (
    <div className="flex w-full flex-col items-center">
      <p className="text-xl mb-4 max-h-48 overflow-auto">{data.text}</p>
      {data.type === "multiple_choice" ? (
        // Multiple Choice
        data.Choice.map((choice, i) => (
          <button
            key={i}
            className={`w-full text-left rounded border-2 border-gray-200 px-4 py-2 mb-2 ${
              selectedChoice === i ? "border-gray-600" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              onChangeChoice(i);
            }}
            disabled={!onChangeChoice}
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
              selectedChoice === 1 ? "border-gray-600" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              onChangeChoice(1);
            }}
          >
            True
          </button>
          <button
            key="falseButton"
            className={`text-xl w-24 rounded border-2 border-gray-200 px-4 py-2 mb-2 ${
              selectedChoice === 0 ? "border-gray-600" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              onChangeChoice(0);
            }}
          >
            False
          </button>
        </div>
      )}
    </div>
  );
}

export default Question;
