interface Question {
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

export type { Answer, Question };
