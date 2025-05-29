import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AnswerService {
  private baseUrl = 'http://localhost:8080/api/answers';

  constructor(private http: HttpClient) {}

  submitAnswers(answers: any[]) {
    return this.http.post(this.baseUrl, answers);
  }
}
