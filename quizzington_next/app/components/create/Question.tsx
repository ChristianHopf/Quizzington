import React from "react";

type Props = {};

function Question({}: Props) {
  return (
    <div className="flex flex-col w-2/3 bg-white rounded-lg shadow-lg px-4 py-2">
      <div className="flex flex-row gap-6">
        <h3 className="text-3xl">Select question type:</h3>
        <ul className="flex flex-row items-center gap-6">
          <li>
            <button className="text-lg text-white rounded-md px-4 py-2 bg-[#b457f1] hover:bg-[#7209b7]">
              Multiple choice
            </button>
          </li>
          <li>
            <button className="text-lg text-white rounded-md px-4 py-2 bg-[#b457f1] hover:bg-[#7209b7]">
              True or False
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Question;
