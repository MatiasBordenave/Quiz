import { QuestionData } from "../types";

interface Props {
  data: QuestionData;
  current: number;
  total: number;
  onAnswer: (option: string) => void;
}

export default function Question({ data, current, total, onAnswer }: Props) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-8 text-center max-w-lg mx-auto">
      <h2 className="mb-6 text-xl font-bold text-gray-800">
        Pregunta {current + 1} de {total}
      </h2>
      
      {data.question && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 mx-auto max-w-xs">
          <img
            src={data.question}
            alt="Perro"
            className="w-32 h-32 object-cover rounded-lg mx-auto shadow-md"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        {data.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="bg-white hover:bg-blue-500 hover:text-white transition-all duration-200 px-4 py-3 rounded-xl shadow-md hover:shadow-lg font-medium text-sm border-2 border-transparent hover:border-blue-600"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
