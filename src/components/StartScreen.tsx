interface Props {
  onStart: () => void;
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">🐶 Dog Quiz</h1>
      <p className="mb-6">Pon a prueba tus conocimientos sobre razas de perros</p>
      <button
        onClick={onStart}
        className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
      >
        Comenzar
      </button>
    </div>
  );
}
