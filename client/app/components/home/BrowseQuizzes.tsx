import React from "react";
import BaseCard from "../ui/BaseCard";

type Props = {};

function BrowseQuizzes({}: Props) {
  return (
    <div className="min-h-screen items-center max-w-7xl mx-auto mt-16 bg-white">
      <div className="flex flex-row flex-wrap gap-16">
        <BaseCard>
          <h1 className="text-white text-2xl">Cars</h1>
          <p className="text-white">Questions: 5</p>
        </BaseCard>
        <BaseCard>
          <h1 className="text-white text-2xl">Movies</h1>
        </BaseCard>
        <BaseCard>
          <h1 className="text-white text-2xl">Animals</h1>
        </BaseCard>
        <BaseCard>
          <h1 className="text-white text-2xl">Animals</h1>
        </BaseCard>
        <BaseCard>
          <h1 className="text-white text-2xl">Animals</h1>
        </BaseCard>
      </div>
    </div>
  );
}

export default BrowseQuizzes;
