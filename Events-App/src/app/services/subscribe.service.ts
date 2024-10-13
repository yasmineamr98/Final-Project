import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  private apiUrl = 'http://127.0.0.1:8000/api/subscribe';  // Adjust this URL to your backend endpoint

  constructor(private http: HttpClient) {}

  subscribeUser(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, { email }, { headers });
  }
}
