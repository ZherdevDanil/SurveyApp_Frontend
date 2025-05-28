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

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private baseUrl = 'http://localhost:8080/api/surveys';

  

  constructor(private http: HttpClient) {}


  getMySurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${this.baseUrl}`);
  }
}
