export interface Test {
  catalogSurveyId: number;
  catalogSurveyName: string;
  catalogSurveyCreated: string;
  userQuestionAnswerVMs: UserQuestionAnswerVM[];
  testDone: string;
  userId: number;
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
  userAnswer?: any;
}