interface Props {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function ResultScreen({ score, total, onRestart }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <h2 className="text-xl font-bold mb-4">🎉 ¡Fin del juego!</h2>
      <p className="mb-6">
        Obtuviste <span className="font-bold">{score}</span> de {total} puntos
      </p>
      <button
        onClick={onRestart}
        className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600"
      >
        Jugar de nuevo
      </button>
    </div>
  );
}
