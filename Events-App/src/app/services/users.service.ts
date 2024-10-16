import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const apiUrl = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userApiUrl = `${apiUrl}/user`;

  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.get<any>(`${this.userApiUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).pipe(
      map((response) => response.data)
    );
  }

  updateUserProfileWithToken(token: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.userApiUrl}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  uploadProfileImage(userId: string, formData: FormData): Observable<any> {
    return this.http.post<any>(`${apiUrl}/user/${userId}/profile-image`, formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    });
  }
}
