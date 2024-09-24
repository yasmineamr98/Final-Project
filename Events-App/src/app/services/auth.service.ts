import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://127.0.0.1:8000/api'; // Base URL for the API

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userApiUrl = `${apiUrl}/login`; // Login API URL

  constructor(private http: HttpClient) {}

  // Method to handle user login
  userLogin(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.userApiUrl, { email, password });
  }

  // Logout method
  logout(): void {
    sessionStorage.clear(); // Clear session storage
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token'); // Check if the user is logged in
  }
}
