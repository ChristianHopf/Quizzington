"use client";

import React, { useEffect, useState } from "react";
import BaseCard from "../ui/BaseCard";
import QuizCard from "./QuizCard";

type Props = {};

function BrowseQuizzes({}: Props) {
  const [browseQuizzes, setBrowseQuizzes] = useState([]);

  useEffect(() => {
    async function fetchBrowseQuizzes() {
      try {
        const res = await fetch("/api/browse");
        if (!res.ok) {
          throw new Error("Failed to fetch quiz");
        }
        const quizzesData = await res.json();
        console.log(quizzesData);
        setBrowseQuizzes(quizzesData);
      } catch (err) {
        console.error("Error fetching quizzes: ", err);
      }
    }
    fetchBrowseQuizzes();
  }, []);
  return (
    <div className="min-h-screen items-center w-full py-4 px-12 mt-16 bg-white">
      <div className="flex flex-row flex-wrap justify-center gap-16">
        {browseQuizzes.map((quiz, index) => (
          <QuizCard key={index} data={quiz} />
        ))}
      </div>
    </div>
  );
}

export default BrowseQuizzes;
