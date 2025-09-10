import { useEffect, useState } from "react";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import ResultScreen from "./components/ResultScreen";
import { Dog, QuestionData } from "./types";

type GameState = "start" | "quiz" | "result";

export default function App() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  // cargar preguntas
  useEffect(() => {
    const fetchDogs = async () => {
      const res = await fetch("https://api.thedogapi.com/v1/breeds");
      const data: Dog[] = await res.json();

      // seleccionamos 5 razas random
      const selected = data.sort(() => 0.5 - Math.random()).slice(0, 5);

      const formatted: QuestionData[] = await Promise.all(
  selected.map(async (dog) => {
    // Pedimos una imagen específica para la raza
    const imgRes = await fetch(
      `https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}`
    );
    const imgData = await imgRes.json();

    const options = [dog.name];
    while (options.length < 4) {
      const randomDog = data[Math.floor(Math.random() * data.length)].name;
      if (!options.includes(randomDog)) options.push(randomDog);
    }

    return {
      question: imgData[0]?.url || "", // imagen asegurada
      answer: dog.name,
      options: options.sort(() => 0.5 - Math.random()),
    };
  })
);


      setQuestions(formatted);
    };

    fetchDogs();
  }, []);

  const handleAnswer = (option: string) => {
    if (option === questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setGameState("result");
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setGameState("start");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {gameState === "start" && (
        <StartScreen onStart={() => setGameState("quiz")} />
      )}
      {gameState === "quiz" && questions.length > 0 && (
        <Question
          data={questions[currentIndex]}
          current={currentIndex + 1}
          total={questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {gameState === "result" && (
        <ResultScreen
          score={score}
          total={questions.length}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}
