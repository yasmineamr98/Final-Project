import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const apiUrl = 'http://127.0.0.1:8000/api'; // Base URL for the API

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private userApiUrl = `${apiUrl}/user`; // Base user API URL

  constructor(private http: HttpClient) {}

  // Method to fetch user by ID
  getUserById(id: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http
      .get<any>(`${this.userApiUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        // Extract the auth token from the response
        map((response) => response.data)
      );
  }

  updateUserProfileWithToken(token: string, user: any): Observable<any> {
    const formData = new FormData();
  
    Object.keys(user).forEach((key) => {
      if (key !== 'profile_image') {
        formData.append(key, user[key]);
      }
    });
  
    if (user.profile_image) {
      formData.append('profile_image', user.profile_image);
    }
  
    return this.http.put<any>(`${this.userApiUrl}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  uploadProfileImage(userId: string, formData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.userApiUrl}/${userId}/profile-image`,
      formData
    );
  }
}
