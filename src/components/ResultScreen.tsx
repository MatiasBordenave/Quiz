import { QuestionData } from "../types";

interface Props {
  score: number;
  total: number;
  questions: QuestionData[];
  onRestart: () => void;
}

export default function ResultScreen({ score, total, questions, onRestart }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl w-full result-card">
      <h2 className="text-2xl font-bold mb-4 text-center">🎉 ¡Juego terminado!</h2>
      <p className="mb-6 text-center">
        Tu puntaje:{" "}
        <span className="font-bold text-indigo-600">
          {score} / {total}
        </span>
      </p>

      <div className="space-y-3 mb-6">
        {questions.map((q, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm"
          >
            <img
              src={q.question}
              alt="Perro"
              className="w-12 h-12 object-cover rounded-md border"
            />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-gray-800">
                Pregunta {index + 1}:
              </p>
              <p>
                Tu respuesta:{" "}
                <span
                  className={`font-bold ${
                    q.selectedAnswer === q.answer ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {q.selectedAnswer || "No contestada"}
                </span>
              </p>
              {q.selectedAnswer !== q.answer && (
                <p>
                  Correcta:{" "}
                  <span className="font-bold text-green-600">{q.answer}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600"
        >
          🔄 Jugar de nuevo
        </button>
      </div>
    </div>
  );
}
