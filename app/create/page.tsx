"use client";

import React, { useState } from "react";
import Header from "../components/ui/Header";
import QuestionForm from "../components/create/QuestionForm";
// import type Question from "../types/question";
// import type Quiz from "../types/quiz";
import axios from "axios";
import { NextResponse } from "next/server";
import Created from "../components/create/Created";
import { Quiz } from "../types/quiz";
import { Question } from "../types/question";

type Props = {};

export default function CreatePage({}: Props) {
  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    questions: [
      {
        text: "",
        type: "multiple_choice",
        choices: ["", "", "", ""],
        correct_choice: 0,
        order_num: 0,
      },
    ],
  });
  const [link, setLink] = useState("");

  const [selectedQuestion, setSelectedQuestion] = useState(0);

  console.log(quiz);

  async function handleSubmitQuiz() {
    console.log(JSON.stringify(quiz));
    const res = await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify(quiz),
    });
    const data = await res.json();
    setLink(data);
    // console.log(data);
  }

  function handleSelectQuestion(index: number) {
    // change the index of the selected question
    setSelectedQuestion(index);
  }

  function handleChangeQuizTopic(event: React.ChangeEvent<HTMLInputElement>) {
    setQuiz((quiz: Quiz) => {
      const newTopic = event.target.value;
      const newQuiz = { ...quiz, title: newTopic };
      return newQuiz;
    });
  }

  function handleChangeQuestionType(type: string) {
    setQuiz((quiz: Quiz) => {
      const newQuestion = {
        ...quiz.questions[selectedQuestion],
        type: type,
      };
      const newQuestions = [...quiz.questions];
      newQuestions[selectedQuestion] = newQuestion;
      const newQuiz = { ...quiz, questions: newQuestions };
      return newQuiz;
    });
  }

  function handleChangeQuestionText(text: string) {
    setQuiz((quiz: Quiz) => {
      const newQuestion = {
        ...quiz.questions[selectedQuestion],
        text: text,
      };
      const newQuestions = [...quiz.questions];
      newQuestions[selectedQuestion] = newQuestion;
      const newQuiz = { ...quiz };
      newQuiz.questions = newQuestions;
      return newQuiz;
    });
  }

  function handleChangeQuestionChoice(index: number, choice: string) {
    setQuiz((quiz: Quiz) => {
      const newChoices: string[] =
        quiz.questions[selectedQuestion].choices || [];
      newChoices[index] = choice;
      const newQuestion = {
        ...quiz.questions[selectedQuestion],
        choices: newChoices,
      };
      const newQuestions = [...quiz.questions];
      newQuestions[selectedQuestion] = newQuestion;
      const newQuiz = { ...quiz };
      newQuiz.questions = newQuestions;
      return newQuiz;
    });
  }

  function handleChangeCorrectChoice(index: number) {
    setQuiz((quiz: Quiz) => {
      const newQuestion = {
        ...quiz.questions[selectedQuestion],
        correct_choice: index,
      };
      const newQuestions = [...quiz.questions];
      newQuestions[selectedQuestion] = newQuestion;
      const newQuiz = { ...quiz, questions: newQuestions };
      return newQuiz;
    });
  }

  function addQuestion() {
    // add an empty question to the quiz
    setQuiz((quiz: Quiz) => {
      const newQuestion = {
        text: "",
        type: "multiple_choice",
        choices: ["", "", "", ""],
        correct_choice: 0,
        order_num: quiz.questions.length,
      };
      const newQuestions = [...quiz.questions, newQuestion];
      const newQuiz = { ...quiz, questions: newQuestions };
      return newQuiz;
    });
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#7209b7] to-[#b457f1]">
      <Header />
      <form
        onSubmit={handleSubmitQuiz}
        className="w-full max-w-5xl bg-white rounded-lg shadow-lg px-8 py-6 mt-8"
      >
        <h1 className="text-3xl text-center mb-6">Create Quiz</h1>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-48">
            <div className="mb-4">
              <label className="text-lg">Quiz topic:</label>
              <input
                type="text"
                value={quiz.title}
                onChange={handleChangeQuizTopic}
                className="w-full rounded border-2 border-gray-400 focus:outline-none focus:border-gray-600 px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl mb-2">Questions</h2>
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
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addQuestion();
                }}
                className="text-md rounded-lg px-4 py-2 mb-6 text-gray-600 hover:bg-gray-200 hover:text-black"
              >
                + Add Question
              </button>
            </div>
          </div>
          <div className="w-full lg:pl-8">
            <QuestionForm
              data={quiz.questions[selectedQuestion]}
              index={selectedQuestion}
              onChangeType={handleChangeQuestionType}
              onChangeText={handleChangeQuestionText}
              onChangeChoice={handleChangeQuestionChoice}
              onChangeCorrectChoice={handleChangeCorrectChoice}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-[#7209b7] text-white rounded-lg px-6 py-3 hover:bg-purple-800 focus:outline-none focus:bg-purple-800"
            onClick={(e) => {
              e.preventDefault();
              handleSubmitQuiz();
            }}
          >
            Create Quiz
          </button>
        </div>
      </form>
      <Created link={link} />
    </main>
  );
}
