// src/app/services/payment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Laravel API base URL

  constructor(private http: HttpClient) {}

  // Initiate the payment by calling Laravel's API
  initiatePayment(orderId: string, amount: number): Observable<any> {
    const body = { order_id: orderId, amount: amount };
    return this.http.post(`${this.apiUrl}/initiate-payment`, body);
  }
}
