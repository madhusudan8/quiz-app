'use client'
import React, { useState, useEffect } from "react";
import quizData from "@/data/data.json";

interface QuizData {
  number: number;
  question: string;
  options: Record<string, string>;
  answer: string;
}

interface Answer {
  question: number;
  selectedAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
}

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset timer when moving to a new question
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

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    // Save the answer
    const correctAnswer = quizData[currentQuestion].answer.split(")")[0];
    const isCorrect = selectedAnswer === correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([
      ...answers,
      {
        question: currentQuestion + 1,
        selectedAnswer,
        correctAnswer,
        isCorrect,
      },
    ]);

    if (timerId) clearInterval(timerId);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeRemaining(60);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setTimeRemaining(60);
  };

  // Calculate progress percentage
  const progressPercentage = (currentQuestion / quizData.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            JavaScript Quiz
          </h2>
          {!showResult && (
            <div className="mt-6">
              {/* Progress Bar */}
              <div className="relative pt-1 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {currentQuestion}/{quizData.length} Questions
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

              {/* Timer */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold">
                  Question {quizData[currentQuestion].number}
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

              {/* Question */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <p className="text-lg font-medium text-gray-900">
                  {quizData[currentQuestion].question}
                </p>
              </div>

              {/* Options */}
              <div className="grid gap-4">
                {Object.entries(quizData[currentQuestion].options).map(
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

              {/* Next Button */}
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
                  {currentQuestion + 1 === quizData.length
                    ? "Finish Quiz"
                    : "Next Question"}
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {showResult && (
            <div className="mt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Quiz Completed!
                </h3>
                <p className="text-lg">
                  Your score:{" "}
                  <span className="font-bold">
                    {score}/{quizData.length}
                  </span>
                </p>
                <p className="text-gray-600 mt-2">
                  {score === quizData.length
                    ? "Perfect! You got all questions correct!"
                    : score >= quizData.length / 2
                    ? "Good job! You passed the quiz."
                    : "Keep practicing. You can do better next time."}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Question Review
                </h3>

                <div className="space-y-4">
                  {answers.map((answer, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        answer.isCorrect
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <p className="font-medium">
                        Question {answer.question}:{" "}
                        {quizData[answer.question - 1].question}
                      </p>
                      <p
                        className={`mt-2 ${
                          answer.isCorrect ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        Your answer:{" "}
                        {answer.selectedAnswer
                          ? `${answer.selectedAnswer}) ${
                              quizData[answer.question - 1].options[
                                answer.selectedAnswer as keyof (typeof quizData)[number]["options"]
                              ]
                            }`
                          : "Not answered"}
                      </p>
                      {!answer.isCorrect && (
                        <p className="mt-1 text-green-700">
                          Correct answer: {answer.correctAnswer}){" "}
                          {
                            quizData[answer.question - 1].options[
                              answer.correctAnswer as keyof (typeof quizData)[number]["options"]
                            ]
                          }
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150"
                >
                  Take Quiz Again
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
