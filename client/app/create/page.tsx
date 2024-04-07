"use client";

import React, { useState } from "react";
import Header from "../components/ui/Header";
import QuestionForm from "../components/create/QuestionForm";
import type Question from "../types/question";
import type Quiz from "../types/quiz";

type Props = {};

export default function CreatePage({}: Props) {
  const [quiz, setQuiz] = useState({
    title: "Quiz Title",
    questions: [
      {
        text: "Where am I?",
        type: "multiple_choice",
        choices: ["Quizzington", "Home Depot", "Movement Plano", "Space"],
        correct_choice: 0,
        order: 0,
      },
      {
        text: "Climbing gym",
        type: "multiple_choice",
        choices: ["Quizzington", "Home Depot", "Movement Plano", "Space"],
        correct_choice: 2,
        order: 1,
      },
      {
        text: "Home Depot",
        type: "multiple_choice",
        choices: ["Quizzington", "Home Depot", "Movement Plano", "Space"],
        correct_choice: 1,
        order: 2,
      },
      {
        text: "Nice weather today",
        type: "true_false",
        choices: null,
        correct_choice: 0,
        order: 3,
      },
    ],
  });

  const [selectedQuestion, setSelectedQuestion] = useState(0);

  function handleSubmitQuiz() {}

  function handleSelectQuestion(index: number) {
    // change the index of the selected question
    setSelectedQuestion(index);
  }

  function handleChangeQuizTopic(event: React.ChangeEvent<HTMLInputElement>) {
    setQuiz((quiz: Quiz) => {
      const newQuiz = { ...quiz };
      const newTopic = event.target.value;
      newQuiz.title = newTopic;
      return newQuiz;
    });
  }

  function handleChangeQuestionType(type: string) {
    setQuiz((quiz: Quiz) => {
      const newQuestion = {
        ...quiz.questions[selectedQuestion],
        type: type,
      };
      if (newQuestion.choices === null) {
        newQuestion.choices = ["", "", "", ""];
      }
      const newQuestions = [...quiz.questions];
      newQuestions[selectedQuestion] = newQuestion;
      const newQuiz = { ...quiz, questions: newQuestions };
      return newQuiz;
    });
  }

  function handleChangeQuestionText(text: string) {
    setQuiz((quiz: Quiz) => {
      const newQuiz = { ...quiz };
      newQuiz.questions[selectedQuestion].text = text;
      return newQuiz;
    });
  }

  function handleChangeQuestionChoice(index: number, choice: string) {
    setQuiz((quiz: Quiz) => {
      const newQuiz = { ...quiz };
      newQuiz.questions[selectedQuestion].choices[index] = choice;
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
        order: 0,
      };
      const newQuestions = [...quiz.questions, newQuestion];
      const newQuiz = { ...quiz, questions: newQuestions };
      return newQuiz;
    });
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#7209b7] to-[#b457f1]">
      <Header />
      <form
        action=""
        onSubmit={handleSubmitQuiz}
        className="container flex flex-col w-2/3 bg-white rounded-lg shadow-lg px-4 py-2"
      >
        <div className="flex flex-row gap-4 mt-2 mb-8 mx-auto">
          <label className="text-2xl">Quiz topic:</label>
          <input
            type="text"
            onChange={handleChangeQuizTopic}
            className="rounded border-2 border-gray-400 focus:outline-none focus:border-gray-600"
          />
        </div>
        <div className="flex flex-row mb-8">
          <div className="flex flex-col w-1/3">
            <h3 className="text-2xl mx-auto mb-2">Questions</h3>
            <div className="flex flex-col items-start gap-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  className="text-xl rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-black"
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
                className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-black"
              >
                + Add Question
              </button>
            </div>
          </div>
          <QuestionForm
            data={quiz.questions[selectedQuestion]}
            index={selectedQuestion}
            onChangeType={handleChangeQuestionType}
            onChangeText={handleChangeQuestionText}
            onChangeChoice={handleChangeQuestionChoice}
            onChangeCorrectChoice={handleChangeCorrectChoice}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#7209b7] text-white rounded px-4 py-2"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </main>
  );
}
