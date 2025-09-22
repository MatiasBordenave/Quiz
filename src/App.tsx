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
      setLoading(true);
      setError(null);

      try {
        const limit = 50; // traemos suficiente para tener variedad
        const res = await fetch(
          `https://api.thedogapi.com/v1/images/search?limit=${limit}&include_breeds=1`,
        );
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data: any[] = await res.json();

        const pairs = data
          .map((i) => ({
            breed: i.breeds?.[0]?.name,
            url: i.url,
          }))
          .filter((p) => p.breed && p.url);

        const map = new Map<string, string>();
        pairs.forEach((p) => {
          if (!map.has(p.breed)) map.set(p.breed, p.url);
        });

        const unique = Array.from(map.entries()).map(([breed, url]) => ({ breed, url }));

        if (unique.length < 5) {
          throw new Error("No se encontraron suficientes razas con imagen en la API.");
        }

        const selected = shuffle(unique).slice(0, 5);

        const allBreeds = unique.map((u) => u.breed);

        const formatted: QuestionData[] = selected.map((s) => {
          const optionsSet = new Set<string>([s.breed]);
          while (optionsSet.size < 4) {
            const random = allBreeds[Math.floor(Math.random() * allBreeds.length)];
            optionsSet.add(random);
          }
          return {
            question: s.url,
            answer: s.breed,
            options: shuffle(Array.from(optionsSet)),
          } as QuestionData;
        });

        if (!mounted) return;
        console.log("Preguntas generadas:", formatted);
        setQuestions(formatted);
      } catch (err: any) {
        console.error("Error cargando imágenes:", err);
        setError(err.message || "Error al cargar");
        setQuestions([]);
      } finally {
        if (mounted) setLoading(false);
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
