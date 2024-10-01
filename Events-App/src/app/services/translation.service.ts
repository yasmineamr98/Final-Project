import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = 'http://172.17.0.2:5000/translate'; // Adjust if necessary

  constructor(private http: HttpClient) {}

  translateAll(content: any): Observable<any> {
    return this.http.post(this.apiUrl, content);
  }
}
