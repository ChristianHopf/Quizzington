import React from "react";

type Props = {
  choices: string[] | null;
  correct: number;
  onChangeChoice: (index: number, choice: string) => void;
  onChangeCorrectChoice: (index: number) => void;
};

function MultipleChoice({
  choices,
  correct,
  onChangeChoice,
  onChangeCorrectChoice,
}: Props) {
  function handleChangeChoice(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    i: number
  ) {
    onChangeChoice(i, event.target.value);
  }

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <div className="flex flex-col">
        <h3 className="text-xl">Answer choices</h3>
        <p>Edit choices and select the correct answer.</p>
      </div>
      {choices?.map((choice, i) => (
        <div key={i} className="flex flex-row gap-4 items-center">
          <textarea
            id={`choice${i}`}
            cols={65}
            rows={2}
            className="text-lg border-2 border-gray-400 focus:outline-none focus:border-gray-600 px-4 py-2"
            value={choice}
            onChange={(e) => {
              handleChangeChoice(e, i);
            }}
          ></textarea>
          <input
            type="radio"
            checked={correct === i}
            onChange={() => {
              onChangeCorrectChoice(i);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default MultipleChoice;
