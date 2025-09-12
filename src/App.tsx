import React, { useEffect, useState } from "react";
import { QuestionData, Dog } from "./types.ts";
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

  useEffect(() => {
    if (!started) return; // 👈 Solo cargamos preguntas si el juego empezó
    const fetchDogs = async () => {
      const res = await fetch("https://api.thedogapi.com/v1/breeds");
      const data: Dog[] = await res.json();

      const selected = data.sort(() => 0.5 - Math.random()).slice(0, 5);

      const formatted: QuestionData[] = await Promise.all(
        selected.map(async (dog) => {
          const imgRes = await fetch(
            `https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}&size=small`
          );
          const imgData = await imgRes.json();

          const options = [dog.name];
          while (options.length < 4) {
            const randomDog = data[Math.floor(Math.random() * data.length)].name;
            if (!options.includes(randomDog)) options.push(randomDog);
          }

          return {
            question: imgData[0]?.url || "",
            answer: dog.name,
            options: options.sort(() => 0.5 - Math.random()),
          };
        })
      );

      setQuestions(formatted);
    };

    fetchDogs();
  }, [started]);

  const handleAnswer = (selected: string) => {
    const updated = [...questions];
    updated[current].selectedAnswer = selected;
    setQuestions(updated);

    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (!started) {
    return (
      <div className="app-container">
        <StartScreen onStart={() => setStarted(true)} />
      </div>
    );
  }

  if (finished) {
    return (
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
            setStarted(false); // vuelve a la pantalla de inicio
          }}
        />
      </div>
    );
  }


  return (
    <div className="app-container">
      <div className="main-card">
        {questions.length > 0 ? (
          <Question
            data={questions[current]}
            onAnswer={handleAnswer}
            current={current}
            total={questions.length}
          />
        ) : (
          <div className="loading-card">
            <div className="spinner"></div>
            <h2 className="loading-text">Cargando preguntas...</h2>
            <p className="loading-subtext">Preparando tu quiz de perros 🐕</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
