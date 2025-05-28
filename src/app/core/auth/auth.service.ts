import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tick } from '@angular/core/testing';



interface LoginRequest{
  username: string;
  password: string;
}

interface RegisterRequest{
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(request: LoginRequest):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,request);
  }
  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, request);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
