import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const apiUrl = 'http://127.0.0.1:8000/api'; // Base URL for the API

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userApiUrl = `${apiUrl}/login`; // Login API URL
  private registerApiUrl = `${apiUrl}/register`; // Register API URL

  constructor(private http: HttpClient, private router: Router) {}

  // Method to handle user login
  userLogin(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.userApiUrl, { email, password });
  }

  // Method to handle user registration
  userRegister(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Observable<any> {
    return this.http.post<any>(this.registerApiUrl, {
      name,
      email,
      password,
      password_confirmation,
    });
  }
  // Logout method
  logout(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId'); // Clear session storage
  }
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken'); // Check if the user is logged in
  }
  isRegistered(): boolean {
    const user = JSON.parse(sessionStorage.getItem('User') || '{}');
    return user?.isRegistered;
  }

  getUserId(): string | null {
    const user = JSON.parse(sessionStorage.getItem('User') || '{}');
    return user?.id || null; // Safely retrieve user ID from the stored user object
  }
}
