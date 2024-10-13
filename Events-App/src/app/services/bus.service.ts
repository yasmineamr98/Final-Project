import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Driver {
  name: string;
  phone_number: string;
  profile_image: string;
}

export interface Point {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  arrived_time: string;
}

export interface Bus {
  id: number;
  name: string;
  bus_number: string;
  capacity: number;
  bus_line: string;
  driver?: Driver | null; // Driver is optional
  points: Point[];
}

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://127.0.0.1:8000/api/buses'; // Your API URL

  constructor(private http: HttpClient) {}

  // Fetch all buses
  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }

  // Fetch basic bus details by ID
  getBusById(busId: number): Observable<Bus> {
    return this.http.get<Bus>(`${this.apiUrl}/${busId}`);
  }

  // Fetch points related to a specific bus ID
  getBusPoints(busId: number): Observable<Point[]> {
    return this.http.get<Point[]>(`${this.apiUrl}/${busId}/points`);
  }

  // Fetch driver related to a specific bus ID
  getBusDriver(busId: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/${busId}/driver`);
  }

  // Fetch complete bus details, including driver and points
  getCompleteBusDetails(busId: number): Observable<Bus> {
    return forkJoin({
      bus: this.getBusById(busId),
      points: this.getBusPoints(busId),
      driver: this.getBusDriver(busId)
    }).pipe(
      map(({ bus, points, driver }) => ({
        ...bus,
        points,
        driver: driver || null  // Ensure driver is null if not found
      }))
    );
  }
  // Download PDF for a specific bus
  downloadPdf(busId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${busId}/download-pdf`, { responseType: 'blob' });
  }
}
