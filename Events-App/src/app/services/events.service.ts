import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { C, ca } from '@fullcalendar/core/internal-common';
import { Observable } from 'rxjs';

// Define the interface for the category as previously defined
interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  created_at: string | null;
  updated_at: string | null;
  capacity: number;
  location: string;
  event_image: string;
  category_id: number;
  user_id: number | null;
  start_time: string | null;
  end_time: string | null;
}

interface Category {
  name: string;
  description: string;
  category_image: string;
  events: Event[];
}
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private _HttpClient: HttpClient) {}

  // Get all events
  getEvents(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/events`);
  }



  getCategories(): Observable<any> {
    return this._HttpClient.get(`http://127.0.0.1:8000/api/categories`);
  }


  getEventsCalendar(start: string, end: string): Observable<any> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);

    return this._HttpClient.get(`${this.baseUrl}/eventss`, { params });
  }


  // Get event by ID
  getEventById(id: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/events/${id}`);
  }

  // Get event details by ID
  getEventDetails(id: any): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/events/${id}`);
  }

  // Attend or leave an event
  attendEvent(eventId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}/events/${eventId}/attend`;
    return this._HttpClient.post(url, {}, { headers });
  }

  // Get events for the current user
  getUserEvents(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this._HttpClient.get(`${this.baseUrl}/user/events`, { headers });
  }

  // Get the attendees count for a specific event
  getAttendeesCount(eventId: number): Observable<any> {
    const url = `${this.baseUrl}/events/${eventId}/attendees-count`;
    return this._HttpClient.get(url);
  }

  // Authentication headers (assuming the token is stored in sessionStorage)
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken'); // Get token from sessionStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  // Get category by ID
  getCategoryById(id: string): Observable<any> {
    return this._HttpClient.get<any>(`${this.baseUrl}/categories/${id}`);
  }

  // Get events by category
  getEventsByCategory(categoryId: string): Observable<Category> {
    return this._HttpClient.get<Category>(`${this.baseUrl}/categories/${categoryId}/events`);
  }
}
