"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Question from "../../components/quiz/Question";
import { BeatLoader } from "react-spinners";
import { UserQuiz } from "@/app/types/userquiz";
import { request } from "http";
import SubmitModal from "@/app/components/quiz/SubmitModal";
import ScoreCard from "@/app/components/quiz/ScoreCard";

type Props = {};

export default function QuizPage({ params }: { params: { id: string } }) {
  // Quiz and loading score states
  const [quiz, setQuiz] = useState<UserQuiz | null>(null);
  const [loadingScores, setLoadingScores] = useState(false);
  const [score, setScore] = useState<number[]>([]);

  // States for user taking the quiz
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [questionChoices, setQuestionChoices] = useState<(number | null)[]>([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        // Fetch quiz and set quizData
        const res = await fetch(`/api/quiz/${params.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch quiz");
        }
        const quizData = await res.json();
        console.log(quizData);
        setQuiz(quizData);
        // Set questionChoices array
        const emptyChoices = [];
        for (let i = 0; i < quizData.Question.length; i++) {
          emptyChoices.push(null);
        }
        setQuestionChoices(emptyChoices);
      } catch (err) {
        console.error("Error fetching quiz: ", err);
      }
    }
    fetchQuiz();
  }, [params.id]);

  async function handleSubmitQuiz() {
    setLoadingScores(true);
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
      // console.log("question choices: " + questionChoices);
      // console.log("correct answers:" + data);
      setScore(data);
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoadingScores(false);
    }
    // Close the open modal
    handleCloseModal();
  }

  function handleOpenModal() {
    // Determine which questions are unanswered to send to the SubmitModal
    const unanswered = [];
    for (let i = 0; i < questionChoices.length; i++) {
      if (questionChoices[i] === null) {
        unanswered.push(i);
      }
    }
    // Set unanswered questions and open the SubmitModal
    setUnansweredQuestions(unanswered);
    console.log(questionChoices);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleRetakeQuiz() {
    setScore([]);
    setSelectedQuestion(0);
    const emptyChoices = [];
    if (quiz) {
      for (let i = 0; i < quiz.Question.length; i++) {
        emptyChoices.push(null);
      }
      setQuestionChoices(emptyChoices);
    }
    setUnansweredQuestions([]);
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

  function handleSelectUnansweredQuestion(index: number) {
    setShowModal(false);
    setSelectedQuestion(index);
  }

  function handleChangeQuestionChoice(index: number) {
    setQuestionChoices((choices: (number | null)[]) => {
      const newChoices = [...choices];
      newChoices[selectedQuestion] = index;
      // console.log(newChoices);
      return newChoices;
    });
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#7209b7] to-[#b457f1]">
      <Header />
      {/* Quiz serves as a loading state */}
      {!quiz && <BeatLoader color="white" />}

      {/* Quiz has been submitted and scores have been received */}
      {!loadingScores && quiz && score.length > 0 && (
        <ScoreCard
          score={score}
          quiz={quiz}
          questionChoices={questionChoices}
          onRetakeQuiz={handleRetakeQuiz}
        />
      )}

      {/* Quiz has loaded and has not been submitted, or quiz has been submitted */}
      {quiz && !loadingScores && score.length === 0 && (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg px-8 py-6 mt-6">
          <h1 className="text-3xl text-center mb-6">{quiz.title}</h1>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-48">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl mx-auto mb-2">Questions</h2>
                {quiz.Question.map((_, index) => (
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
                data={quiz.Question[selectedQuestion]}
                index={selectedQuestion}
                selectedChoice={questionChoices[selectedQuestion]}
                onChangeChoice={handleChangeQuestionChoice}
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            {selectedQuestion === quiz.Question.length - 1 ? (
              <button
                className="bg-[#7209b7] text-white rounded-lg px-6 py-3 hover:bg-purple-800 focus:outline-none focus:bg-purple-800"
                onClick={handleOpenModal}
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
      {/* Quiz has been submitted and scores have not yet been received */}
      {loadingScores ? (
        <BeatLoader color="white" />
      ) : (
        <SubmitModal
          show={showModal}
          unansweredQuestions={unansweredQuestions}
          onSelectUnanswered={handleSelectUnansweredQuestion}
          onClose={handleCloseModal}
          onConfirm={handleSubmitQuiz}
        />
      )}
    </main>
  );
}
