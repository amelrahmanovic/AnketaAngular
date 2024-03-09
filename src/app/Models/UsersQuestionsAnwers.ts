export interface UsersQuestionsAnwers {
    id: number;
    email: string;
    finished: boolean;
    successfulAnswers: number;
    wrongAnswers: number;
    userQuestionAnswerVM: UserQuestionAnswerVM[];
  }
  export interface UserQuestionAnswerVM {
    questionId: number;
    questionName: string;
    questionAnswerUserVM: QuestionAnswerUserVM[];
  }
  export interface QuestionAnswerUserVM {
    id: number;
    name: string;
    isCorrect: boolean;
    userAnswer:  string;
  }