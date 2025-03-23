"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import quizData from "@/data/data.json";
import { Answer, Question } from "@/type/types";

type QuizDataType = Record<string, Question[]>;

function QuizApp() {
  const { quiz } = useParams<{ quiz: string }>();
  const typedQuizData: QuizDataType = quizData;

  const selectedQuiz: Question[] | undefined = typedQuizData[quiz];

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!showResult) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleNextQuestion();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      setTimerId(timer);
      return () => clearInterval(timer);
    }
  }, [currentQuestion, showResult]);

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">
          Quiz not found! Please select a valid tech stack.
        </h1>
      </div>
    );
  }

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    if (timerId) clearInterval(timerId);

    if (currentQuestion + 1 < selectedQuiz.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeRemaining(60);
    } else {
      setShowResult(true);
    }
  };

  const progressPercentage = (currentQuestion / selectedQuiz.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {quiz.charAt(0).toUpperCase() + quiz.slice(1)} Quiz
          </h2>
          {!showResult && (
            <div className="mt-6">
              <div className="relative pt-1 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {currentQuestion}/{selectedQuiz.length} Questions
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 mt-2">
                  <div
                    style={{ width: `${progressPercentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold text-black">
                  Question {selectedQuiz[currentQuestion].number}
                </div>
                <div
                  className={`rounded-full px-3 py-1 font-bold ${
                    timeRemaining <= 10
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  Time: {timeRemaining}s
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <p className="text-lg font-medium text-gray-900">
                  {selectedQuiz[currentQuestion].question}
                </p>
              </div>

              <div className="grid gap-4">
                {Object.entries(selectedQuiz[currentQuestion].options).map(
                  ([key, value]) => (
                    <button
                      key={key}
                      onClick={() => handleAnswerSelect(key)}
                      className={`px-6 py-4 border rounded-lg text-left text-lg transition duration-150 ${
                        selectedAnswer === key
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-semibold">{key}) </span> {value}
                    </button>
                  )
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className={`px-6 py-2 rounded-lg font-medium text-white ${
                    selectedAnswer === null
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {currentQuestion + 1 === selectedQuiz.length
                    ? "Finish Quiz"
                    : "Next Question"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizApp;
