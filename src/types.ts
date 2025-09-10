export interface Dog {
  id: number;
  name: string;
  temperament?: string;
  life_span?: string;
  weight?: { metric: string };
  height?: { metric: string };
  image?: { url: string };
}

export interface QuestionData {
  question: string; // en este caso la url de la foto
  answer: string;   // la raza correcta
  options: string[];
}
