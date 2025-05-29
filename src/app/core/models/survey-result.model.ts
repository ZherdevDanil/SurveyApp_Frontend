import { QuestionResultResponse } from "./question-result.model";


export interface SurveyResultsResponse {
  surveyId: number;
  title: string;
  questionResultResponses: QuestionResultResponse[];
}