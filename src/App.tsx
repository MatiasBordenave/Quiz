import React, { useEffect, useState } from "react";
import { QuestionData, Dog } from "./types.ts";
import Question from "./components/Question";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleAnswer = (selected: string) => {
    const updated = [...questions];
    updated[current].selectedAnswer = selected; // 👈 guardamos lo que eligió
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

  if (finished) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          ¡Juego terminado! 🎉
        </h1>
        <p className="text-lg mb-6 text-center">
          Tu puntaje: {score} / {questions.length}
        </p>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 shadow bg-white flex items-center gap-4"
            >
              <img
                src={q.question}
                alt="dog"
                className="w-28 h-28 object-cover rounded-lg shadow"
              />
              <div>
                <p className="font-semibold mb-1">
                  Pregunta {index + 1}:
                </p>
                <p>
                  Tu respuesta:{" "}
                  <span
                    className={
                      q.selectedAnswer === q.answer
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {q.selectedAnswer}
                  </span>
                </p>
                {q.selectedAnswer !== q.answer && (
                  <p>
                    Correcta:{" "}
                    <span className="text-green-600 font-bold">{q.answer}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      {questions.length > 0 && (
        <Question data={questions[current]} onAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default App;
