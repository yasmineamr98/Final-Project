import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://127.0.0.1:8000/api'; // Base URL for the API

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userApiUrl = `${apiUrl}/users`; // Base user API URL

  constructor(private http: HttpClient) {}

  // Method to fetch user by ID
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.userApiUrl}/${id}`);
  }
}
