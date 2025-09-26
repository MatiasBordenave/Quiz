import React, { useState } from "react";
import { QuestionData } from "../types";

interface Props {
  data: QuestionData;
  current: number;
  total: number;
  onAnswer: (option: string) => void;
}

export default function Question({ data, current, total, onAnswer }: Props) {
  const [loaded, setLoaded] = useState(false);
  const FALLBACK = "https://via.placeholder.com/192?text=Sin+imagen";

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-8 text-center max-w-lg mx-auto">
      <h2 className="mb-6 text-xl font-bold text-gray-800">
        Pregunta {current + 1} de {total}
      </h2>

      {data.question ? (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 mx-auto max-w-sm">
          <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
            
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#f3f4f6" }}>
                <div className="animate-pulse w-28 h-8 rounded bg-gray-300"></div>
              </div>
            )}

            <img src={data.question}
                alt={`Imagen de ${data.answer}`}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK;
                  setLoaded(true);
                }}
                className={`transition-opacity duration-300 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  width: "192px",
                  height: "192px",
                  objectFit: "contain",
                }}
              />

          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">No hay imagen disponible 🐶</p>
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
