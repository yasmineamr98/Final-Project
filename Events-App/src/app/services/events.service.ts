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
}
