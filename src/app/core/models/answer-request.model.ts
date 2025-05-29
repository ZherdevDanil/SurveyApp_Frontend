export interface AnswerRequest {
  questionId: number;
  textAnswer?: string;
  selectedOptionId?: number[];
}
