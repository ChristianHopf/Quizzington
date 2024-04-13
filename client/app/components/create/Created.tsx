import React, { useState } from "react";
import Header from "../ui/Header";
import CopyLink from "./CopyLink";

type Props = {
  link: string;
};

function Created({ link }: Props) {
  return (
    <div className="w-full max-w-5xl items-center bg-white rounded-lg shadow-lg px-8 py-6 mt-8">
      <h1 className="text-3xl text-center mb-2">
        Your quiz has been successfully created!
      </h1>
      <p className="text-center mb-4">
        Copy the link below to access your quiz.
      </p>
      <CopyLink link={link} />
    </div>
  );
}

export default Created;
