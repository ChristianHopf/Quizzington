"use client";

import React, { useState } from "react";

type Props = {
  link: string;
};

function CopyLink({ link }: Props) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(`http://localhost:3000/quiz/${link}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="mx-auto flex items-center justify-center">
      <label htmlFor="link" className="sr-only">
        Label
      </label>
      <input
        id="link"
        type="text"
        className="w-[36rem] bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={`http://localhost:3000/quiz/${link}`}
        disabled
        readOnly
      />
      <button
        onClick={copyToClipboard}
        className="w-[85px] ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center flex justify-center"
      >
        <span id="default-message" className={copied ? "hidden" : ""}>
          Copy
        </span>
        <span
          id="success-message"
          className={copied ? "inline-flex items-center" : "hidden"}
        >
          <svg
            className="w-3 h-3 text-white me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
          Copied!
        </span>
      </button>
    </div>
  );
}

export default CopyLink;
