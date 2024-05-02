import React from "react";
import BaseCard from "../ui/BaseCard";
import { Quiz } from "@/app/types/quiz";

type Props = {
  data: Quiz;
};

function QuizCard({ data }: Props) {
  return (
    <BaseCard>
      <h1 className="text-white text-2xl">{data.title}</h1>
      <p className="text-white">Questions: {data.length}</p>
    </BaseCard>
  );
}

export default QuizCard;
