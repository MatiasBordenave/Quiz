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
  const barColor = percent >= 80 ? "bg-green-500" : percent >= 50 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl w-full result-card">
      <h2 className="text-2xl font-bold mb-4 text-center">Resultados</h2>

      <div className="mb-6 text-center">
        <span className={`text-3xl font-extrabold ${performanceColor}`}>{percent}%</span>
        <p className="text-gray-500">{score} de {total} correctas</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">
          <div className={`${barColor} h-2 rounded-full`} style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {questions.map((q, index) => {
          const isCorrect = q.selectedAnswer === q.answer;
          return (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-white border shadow-sm"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold text-white ${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {isCorrect ? '✔' : '✖'}
              </div>
              <div className="w-10 h-10 rounded-md border bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={q.question}
                  alt="Imagen de la pregunta"
                  className="w-full h-full object-contain"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                />
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium text-gray-800">Pregunta {index + 1}</p>
                <p className="text-gray-700">
                  Tu respuesta: {" "}
                  <span className={`font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                    {q.selectedAnswer || "No contestada"}
                  </span>
                </p>
                {!isCorrect && (
                  <p className="text-gray-700">
                    Correcta: <span className="font-semibold text-green-700">{q.answer}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-gray-900 text-white px-6 py-2 rounded-xl hover:bg-black"
        >
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
}
