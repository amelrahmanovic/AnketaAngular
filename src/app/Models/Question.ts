export interface Question {
    id: number;
    name: string;
    questionAnswer: QuestionAnswer[];
  }
  export  interface QuestionAnswer {
    id: number;
    name: string;
    isCorrect: boolean;
  }