import { OptionStats } from "./option-stats.model";

export interface QuestionResultResponse {
  questionId: number;
  text: string;
  questionType: 'TEXT' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  optionStats?: OptionStats[];
  textAnswers?: string[];
}