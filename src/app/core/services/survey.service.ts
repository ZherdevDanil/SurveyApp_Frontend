import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Survey } from '../models/survey.model';
import { AnswerRequest } from '../models/answer-request.model';
import { SurveyResultsResponse } from '../models/survey-result.model';

/*export interface Survey {
  id: number;
  title: string;
  description: string;
  requireAuth: boolean;
  createdAt: string;
}*/


export interface CreateSurveyRequest {
  title: string;
  description:string;
  requireAuth: boolean;
  isPublic: boolean;
  questions: QuestionRequest[],
  activeFrom?: string,
  activeUntil?:string


}

export interface QuestionRequest {
  text: string;
  type: 'TEXT' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  position: number;
  options?: {text: string, position:number}[];
}


@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private baseUrl = 'http://localhost:8080/api/surveys';
  

  

  constructor(private http: HttpClient) {}


  getMySurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${this.baseUrl}`);
  }

  createSurvey(request: CreateSurveyRequest): Observable<any> {
  return this.http.post(`${this.baseUrl}`, request);
}

  getSurveyById(id:number): Observable<Survey>{
      return this.http.get<Survey>(`${this.baseUrl}/${id}`);
  }

  getSurveyDetailsById(id:number): Observable<Survey>{
    return this.http.get<Survey>(`${this.baseUrl}/survey-details/${id}`)
  }

  updateQuestion(questionId:number, data:QuestionRequest):Observable<any>{
      return this.http.put<any>(`http://localhost:8080/api/questions/${questionId}`,data);
  }

  addQuestion(surveyId: number, question: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/${surveyId}/questions`, question);
}
  updateSurvey(surveyId:number, data:any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${surveyId}`,data)
  }

  checkIfAlreadySubmitted(surveyId:number): Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:8080/api/answers/check`,{
      params:{ surveyId }
    });
  }

  submitAnswers(answers: AnswerRequest[]): Observable<any>{
    return this.http.post(`http://localhost:8080/api/answers`,answers);
  }

  getSurveyAnalytics(surveyId: number) {
  return this.http.get<SurveyResultsResponse>(`http://localhost:8080/api/analytics/${surveyId}/results`);
}

  getPublicSurveys():Observable<any[]>{
    return this.http.get<any>(`${this.baseUrl}/public`)
  }

  finishSurvey(surveyId:number):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${surveyId}/finish`,{});
  }

}
