import React from "react";

type Props = {};

function HomeInfo({}: Props) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-white text-6xl mb-8 mx-auto">
        A quick and easy way to create a quiz for your friends!
      </h1>
      <button className="text-white text-xl px-4 py-2 rounded-md hover:bg-white hover:text-black">
        Click here to get started
      </button>
      <h1 className="text-white text-4xl mx-auto mt-32">Browse quizzes</h1>
    </div>
  );
}

export default HomeInfo;
