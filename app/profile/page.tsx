"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import QuizList from "../components/profile/QuizList";
import { BeatLoader } from "react-spinners";
import { UserQuiz } from "@/app/types/userquiz";
import Link from "next/link";

type Props = {};

function ProfilePage({}: Props) {
  const [quizzes, setQuizzes] = useState<UserQuiz[] | null>(null);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) {
          console.error("Failed to fetch quizzes");
        }
        const quizzesData = await res.json();
        // console.log(quizzesData);
        setQuizzes(quizzesData);
      } catch (err) {
        console.error("Failed to fetch quizzes: " + err);
      }
    }
    fetchQuizzes();
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#7209b7] to-[#b457f1]">
      <Header />
      {!quizzes && <BeatLoader color="white" />}
      {quizzes && (
        <div className="w-full max-w-4xl mt-6">
          <div className="flex flex-row mb-4 justify-between">
            <h1 className="text-3xl text-white">My Quizzes</h1>
            <Link href={"/create"}>
              <button className="text-xl text-white rounded-md px-4 py-2 ">
                New Quiz
              </button>
            </Link>
          </div>
          <QuizList quizzes={quizzes} />
        </div>
      )}
    </main>
  );
}

export default ProfilePage;
