import { QuestionData } from "../types";

interface Props {
  score: number;
  total: number;
  questions: QuestionData[];
  onRestart: () => void;
}

export default function ResultScreen({ score, total, questions, onRestart }: Props) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const performanceColor =
    percent >= 80 ? "text-green-600" : percent >= 50 ? "text-yellow-600" : "text-red-600";
  const barColor =
    percent >= 80 ? "bg-green-500" : percent >= 50 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="result-card max-w-3xl w-full">
      {/* Título */}
      <h2 className="title mb-6">Resultados</h2>

      {/* Porcentaje y barra */}
      <div className="mb-10 text-center">
        <span className={`text-4xl font-extrabold ${performanceColor}`}>{percent}%</span>
        <p className="text-gray-600">{score} de {total} correctas</p>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
          <div
            className={`${barColor} h-3 rounded-full transition-all`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Lista de respuestas */}
      <div className="grid gap-5">
        {questions.map((q, index) => {
          const isCorrect = q.selectedAnswer === q.answer;

          return (
            <div
              key={index}
              className={`flex items-center gap-6 p-4 rounded-2xl shadow-md border transition ${
                isCorrect
                  ? "bg-green-100 border-green-300 hover:shadow-lg"
                  : "bg-red-100 border-red-300 hover:shadow-lg"
              }`}
            >
              {/* Imagen */}
              <div className="w-24 h-24 rounded-xl border bg-white flex items-center justify-center overflow-hidden shadow">
                <img
                  src={q.question}
                  alt="Imagen de la pregunta"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Texto */}
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Pregunta {index + 1}</p>
                <p className="text-gray-700">
                  Tu respuesta:{" "}
                  <span
                    className={`font-semibold ${
                      isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {q.selectedAnswer || "No contestada"}
                  </span>
                </p>
                {!isCorrect && (
                  <p className="text-gray-700">
                    Correcta:{" "}
                    <span className="font-semibold text-green-700">{q.answer}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón */}
      <div className="text-center mt-10">
        <button
          onClick={onRestart}
          className="bg-gray-900 text-white px-8 py-3 rounded-2xl hover:bg-black shadow-md hover:shadow-lg transition"
        >
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
}
