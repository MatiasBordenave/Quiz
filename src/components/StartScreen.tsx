interface Props {
  onStart: () => void;
}

export default function StartScreen({ onStart }: Props) {
  return (

      <div className="main-card flex flex-col items-center text-center">
        <h1 className="title">🐶 Dog Quiz</h1>
        <p className="subtitle mb-4">
          Pon a prueba tus conocimientos sobre razas de perros
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Dog Icon"
          className="w-20 h-20 mb-4"
        />

        <p className="text-gray-700 mb-6">
          ¡Descubre cuántas razas puedes adivinar correctamente!
        </p>

        <button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition"
        >
          🚀 Comenzar
        </button>
      </div>

  );
}
