import React from "react";

type Props = {
  correct: number;
  onChangeCorrectChoice: (index: number) => void;
};

function TrueOrFalse({ correct, onChangeCorrectChoice }: Props) {
  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <h3 className="text-xl">Answer</h3>
      <div className="flex flex-row gap-4 items-center">
        <button
          className={`text-white rounded-md px-4 py-2 ${
            correct === 1 ? "bg-[#7209b7]" : "bg-[#b457f1]"
          } hover:bg-[#7209b7] block`}
          onClick={(e) => {
            e.preventDefault();
            onChangeCorrectChoice(1);
          }}
        >
          True
        </button>
        <button
          className={`text-white rounded-md px-4 py-2 ${
            correct === 0 ? "bg-[#7209b7]" : "bg-[#b457f1]"
          } hover:bg-[#7209b7] block`}
          onClick={(e) => {
            e.preventDefault();
            onChangeCorrectChoice(0);
          }}
        >
          False
        </button>
      </div>
    </div>
  );
}

export default TrueOrFalse;
