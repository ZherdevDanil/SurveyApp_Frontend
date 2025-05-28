import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface Survey {
  id: number;
  title: string;
  description: string;
  requireAuth: boolean;
  createdAt: string;
}


export interface CreateSurveyRequest {
  title: string;
  description:string;
  requireAuth: boolean;
  questions: QuestionRequest[],


}

export interface QuestionRequest {
  text: string;
  type: 'TEXT' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  position: number;
  options?: string[];
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

}
