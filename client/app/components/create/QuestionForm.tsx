import React from "react";
import MultipleChoice from "./MultipleChoice";
import TrueOrFalse from "./TrueOrFalse";

type Props = {
  data: Question;
  index: number;
  onChangeType: (type: string) => void;
  onChangeText: (text: string) => void;
  onChangeChoice: (index: number, choice: string) => void;
  onChangeCorrectChoice: (index: number) => void;
};
type Question = {
  question_text: string;
  question_type: string;
  choices: string[] | null;
  correct_choice: number;
  question_order_num: number;
};

function Question({
  data,
  index,
  onChangeType,
  onChangeText,
  onChangeChoice,
  onChangeCorrectChoice,
}: Props) {
  // const [type, setType] = useState(data.type);

  function handleChangeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChangeText(event.target.value);
  }
  console.log(data.question_type);

  return (
    <div className="flex w-full flex-col items-center">
      {/* <h3 className="text-2xl mb-4">Question {index + 1}</h3> */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-6 mb-4 items-center">
          <h3 className="text-xl">Select question type:</h3>
          <div className="flex flex-row gap-6">
            <button
              className={`text-white rounded-md px-4 py-2 ${
                data.question_type === "multiple_choice"
                  ? "bg-[#7209b7]"
                  : "bg-[#b457f1]"
              } hover:bg-[#7209b7] block`}
              onClick={(e) => {
                e.preventDefault();
                onChangeType("multiple_choice");
              }}
            >
              Multiple Choice
            </button>
            <button
              className={`text-white rounded-md px-4 py-2 ${
                data.question_type === "true_false"
                  ? "bg-[#7209b7]"
                  : "bg-[#b457f1]"
              } hover:bg-[#7209b7] block`}
              onClick={(e) => {
                e.preventDefault();
                onChangeType("true_false");
              }}
            >
              True or False
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-xl">Question text</label>
          <textarea
            cols={5}
            rows={3}
            className="rounded border-2 border-gray-400 focus:outline-none focus:border-gray-700 px-4 py-2"
            value={data.question_text}
            onChange={(event) => {
              handleChangeText(event);
            }}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          {data.question_type === "multiple_choice" ? (
            <MultipleChoice
              key={`multiple_choice_${index}`}
              choices={data.choices}
              correct={data.correct_choice}
              onChangeChoice={onChangeChoice}
              onChangeCorrectChoice={onChangeCorrectChoice}
            />
          ) : (
            <TrueOrFalse
              correct={data.correct_choice}
              onChangeCorrectChoice={onChangeCorrectChoice}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Question;
