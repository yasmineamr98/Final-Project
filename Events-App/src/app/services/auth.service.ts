import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://127.0.0.1:8000/api'; // Update base URL

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userApiUrl = `${apiUrl}/login`; // User login API URL

  constructor(private http: HttpClient) {}

  // User login method
  userLogin(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.userApiUrl, { email, password });
  }

  // Logout method
  logout(): void {
    sessionStorage.clear(); // Clear session storage on logout
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token'); // Check if user is logged in
  }
}
