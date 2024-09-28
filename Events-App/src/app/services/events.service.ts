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
     return this._HttpClient.get('https://dummyjson.com/c/7dd5-12ba-4996-a435')
  }

  getEventById(id: number): Observable<any> {
    return this._HttpClient.get(`https://dummyjson.com/c/7dd5-12ba-4996-a435/${id}`);
  }

  getEventDetails(id:any): Observable<any> {
   return this._HttpClient.get(`https://dummyjson.com/c/7dd5-12ba-4996-a435/${id}`)
  }
}
