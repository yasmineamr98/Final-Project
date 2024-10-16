import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'http://127.0.0.1:8000/api/eventssearch'; // Updated URL for your API
  private categoriesUrl = 'http://127.0.0.1:8000/api/categories'; // New URL for categories

  constructor(private http: HttpClient) {}

  // Search events with filters
  search(query: string, filters?: { date?: string; category?: number; sortBy?: string }): Observable<any[]> {
    let params: string[] = [`search_name=${query}`];

    if (filters?.date) {
      params.push(`search_date=${filters.date}`);
    }

    if (filters?.category) {
      params.push(`category_filter=${filters.category}`);
    }

    if (filters?.sortBy) {
      params.push(`sort_by=${filters.sortBy}`);
    }

    const paramsString = params.join('&');
    return this.http.get<any[]>(`${this.apiUrl}?${paramsString}`);
  }

  // Fetch categories from the API
  fetchCategories(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(this.categoriesUrl);
  }

  // Attend or leave an event
  attendEvent(eventId: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/events/${eventId}/attend`, {});
  }
}
