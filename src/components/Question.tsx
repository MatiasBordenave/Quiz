import { QuestionData } from "../types";

interface Props {
  data: QuestionData;
  current: number;
  total: number;
  onAnswer: (option: string) => void;
}

export default function Question({ data, current, total, onAnswer }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-md">
      <h2 className="mb-4 font-semibold">
        Pregunta {current} de {total}
      </h2>
      {data.question && (
        <img
            src={data.question}
            alt="dog"
            className="w-48 h-48 object-cover rounded-lg shadow"
            loading="lazy"
            />


      )}
      <div className="grid grid-cols-2 gap-3">
        {data.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
