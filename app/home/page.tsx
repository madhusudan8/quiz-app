"use client";
import { useRouter } from "next/navigation";

const techStacks = [
  { name: "Javascript", path: "/quiz/javascript" },
  { name: "React", path: "/quiz/react" },
  { name: "GitHub", path: "/quiz/github" },
  { name: "Nodejs", path: "/quiz/nodejs" },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black/40 p-6">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');`}
      </style>

      <h1
        className="text-5xl font-extrabold mb-8 text-center text-white drop-shadow-lg"
        style={{ fontFamily: "Pacifico, cursive" }}
      >
        Choose a Tech Stack
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {techStacks.map((tech) => (
          <div
            key={tech.name}
            className="relative cursor-pointer  backdrop-blur-lg rounded-xl shadow-lg p-6 text-center 
                     hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-xl "
            onClick={() => router.push(`/quiz/${tech.name.toLowerCase()}`)}
          >
            <h2 className="text-2xl font-bold text-white">{tech.name}</h2>
            <p className="text-gray-300 mt-2">Click to start the quiz</p>
            <span className="absolute inset-0 rounded-xl border border-transparent hover:border-white/30 transition-all duration-300"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
