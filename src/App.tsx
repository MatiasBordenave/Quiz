import React, { useEffect, useState } from "react";
import { QuestionData } from "./types";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import ResultScreen from "./components/ResultScreen";

import "./App.css";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (!started) return;

    let mounted = true;
    
   const fetchDogs = async () => {
  try {
    const res = await fetch("https://api.thedogapi.com/v1/breeds", {
      headers: {
        "x-api-key": "live_FAJItsuYev8Qj2vZUUmJLAPyDrzgVZQh0zcmkFChWXgt3EXzJAYv7Qfp4sS6bP87",
      },
    });

    if (!res.ok) throw new Error("Error al consultar la API");
    const data = await res.json();

    // quedarnos solo con razas que tengan imagen
    const withImages = data.filter((dog: any) => dog.image?.url);

    // mezclar y tomar 10 (por ejemplo)
    const selected = withImages.sort(() => Math.random() - 0.5).slice(0, 5);

    const questions = selected.map((dog: any) => {
      // opciones incorrectas
      const wrongOptions = withImages
        .filter((d: any) => d.id !== dog.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((d: any) => d.name);

      return {
        question: dog.image.url,
        answer: dog.name,
        options: [...wrongOptions, dog.name].sort(() => Math.random() - 0.5),
      };
    });

    setQuestions(questions);
  } catch (error) {
    console.error("Error cargando razas:", error);
  }
};




    fetchDogs();

    return () => {
      mounted = false;
    };
  }, [started]);

  const handleAnswer = (selected: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[current] = { ...copy[current], selectedAnswer: selected };
      return copy;
    });

    setScore((prev) => (selected === questions[current].answer ? prev + 1 : prev));

    if (current + 1 < questions.length) setCurrent((p) => p + 1);
    else setFinished(true);
  };

  if (!started) return (
    <div className="app-container">
      <StartScreen onStart={() => setStarted(true)} />
    </div>
  );

  if (finished) return (
    <div className="app-container">
      <ResultScreen
        score={score}
        total={questions.length}
        questions={questions}
        onRestart={() => {
          setQuestions([]);
          setCurrent(0);
          setScore(0);
          setFinished(false);
          setStarted(false);
          setError(null);
        }}
      />
    </div>
  );

  return (
    <div className="app-container">
      <div className="main-card">
        {loading ? (
          <div className="loading-card">
            <div className="spinner"></div>
            <h2 className="loading-text">Cargando preguntas...</h2>
            <p className="loading-subtext">Preparando tu quiz de perros 🐕</p>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        ) : questions.length > 0 ? (
          <Question
            data={questions[current]}
            onAnswer={handleAnswer}
            current={current}
            total={questions.length}
          />
        ) : (
          <div className="loading-card">
            <h2>No hay preguntas disponibles</h2>
            {error ? <p className="text-red-500">{error}</p> : <p>Probá recargar o revisá la consola.</p>}
            <button onClick={() => setStarted(false)} className="mt-4 px-4 py-2 bg-gray-200 rounded">
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
