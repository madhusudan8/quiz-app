interface Question {
  number: number;
  question: string;
  options: Record<string, string>;
  answer: string;
  correctAnswer: string;
}

interface Answer {
  question: number;
  selectedAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
}
type LayoutProps = {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export type { Answer, Question, LayoutProps };
