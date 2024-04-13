"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Question from "../../components/quiz/Question";
import { BeatLoader } from "react-spinners";
import { UserQuiz } from "@/app/types/userquiz";
import { request } from "http";

type Props = {};

export default function QuizPage({ params }: { params: { id: string } }) {
  const [quiz, setQuiz] = useState<UserQuiz | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [questionChoices, setQuestionChoices] = useState<number[]>([]);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch(`/api/quiz/${params.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch quiz");
        }
        const quizData = await res.json();
        console.log(quizData);
        setQuiz(quizData);
      } catch (err) {
        console.error("Error fetching quiz: ", err);
      }
    }
    fetchQuiz();
  }, [params.id]);

  const sampleQuiz = {
    title: "Quiz Title",
    questions: [
      {
        question_text: "Where am I?",
        question_type: "multiple_choice",
        choices: ["Quizzington", "Home Depot", "Movement Plano", "Space"],
        correct_choice: 0,
        question_order_num: 0,
      },
      {
        question_text: "Climbing gym",
        question_type: "multiple_choice",
        choices: ["Quizzington", "Home Depot", "Movement Plano", "Space"],
        correct_choice: 2,
        question_order_num: 1,
      },
      {
        question_text: "Home Depot",
        question_type: "multiple_choice",
        choices: ["Quizzington", "Home Depot", "Movement Plano", "Space"],
        correct_choice: 1,
        question_order_num: 2,
      },
      {
        question_text: "Nice weather today",
        question_type: "true_false",
        choices: null,
        correct_choice: 0,
        question_order_num: 3,
      },
    ],
  };

  async function handleSubmitQuiz() {
    // Open modal asking user to confirm that they want to submit the quiz

    // Submit quiz
    try {
      // Post choices array
      const res = await fetch(`/api/answers`, {
        method: "POST",
        body: JSON.stringify({
          quizId: params.id,
          questionChoices: questionChoices,
        }),
      });
      const data = await res.json();
      console.log(questionChoices);
      console.log(data);
      // Display scorecard
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  function nextQuestion() {
    setSelectedQuestion((current) => {
      return current + 1;
    });
  }

  function handleSelectQuestion(index: number) {
    // change the index of the selected question
    setSelectedQuestion(index);
  }

  function handleChangeQuestionChoice(index: number) {
    setQuestionChoices((choices: number[]) => {
      const newChoices = [...choices];
      newChoices[selectedQuestion] = index;
      return newChoices;
    });
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#7209b7] to-[#b457f1]">
      <Header />
      {!quiz && <BeatLoader color="#36d7b7" />}
      {quiz && (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg px-8 py-6 mt-8">
          <h1 className="text-3xl text-center mb-6">{quiz.title}</h1>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-48">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl mx-auto mb-2">Questions</h2>
                {quiz.questions.map((_, index) => (
                  <button
                    key={index}
                    className={`text-lg rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-black ${
                      selectedQuestion === index ? "bg-gray-200 text-black" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectQuestion(index);
                    }}
                  >
                    Question {index + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full lg:pl-8">
              <Question
                data={quiz.questions[selectedQuestion]}
                index={selectedQuestion}
                selectedChoice={questionChoices[selectedQuestion]}
                onChangeChoice={handleChangeQuestionChoice}
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            {selectedQuestion === quiz.questions.length - 1 ? (
              <button
                className="bg-[#7209b7] text-white rounded-lg px-6 py-3 hover:bg-purple-800 focus:outline-none focus:bg-purple-800"
                onClick={handleSubmitQuiz}
              >
                Submit
              </button>
            ) : (
              <button
                className="bg-[#7209b7] text-white rounded-lg px-6 py-3 hover:bg-purple-800 focus:outline-none focus:bg-purple-800"
                onClick={nextQuestion}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
