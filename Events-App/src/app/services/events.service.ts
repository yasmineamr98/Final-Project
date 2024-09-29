import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private _HttpClient: HttpClient) {}

  getEvents():Observable<any>
  { 
     return this._HttpClient.get('http://localhost:8000/api/events')
  }

  getEventById(id: number): Observable<any> {
    return this._HttpClient.get(`http://localhost:8000/api/events/${id}`);
  }

  getEventDetails(id:any): Observable<any> {
   return this._HttpClient.get(`http://localhost:8000/api/events/${id}`)
  }
}
