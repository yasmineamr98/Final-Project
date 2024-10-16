import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Notification interface
interface Notification {
  id: number;               // Adjust according to your actual data structure
  name: string;             // Name or title of the notification
  description: string;      // Description of the notification
  date: string;             // Date or time of the notification
}

// Define the response structure from the API
interface NotificationsResponse {
  new_events: Notification[];
  upcoming_events: Notification[];
  user_attended_events: Notification[];
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private apiUrl = 'http://127.0.0.1:8000/api/notifications'; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  // Method to get notifications
  getNotifications(): Observable<NotificationsResponse> {
    // Get the authentication token from session storage
    const token = sessionStorage.getItem('authToken');

    // Set up the headers with the authorization token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Make the GET request with headers and expect NotificationsResponse
    return this.http.get<NotificationsResponse>(this.apiUrl, { headers });
  }
}
