import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  readonly http = inject(HttpClient);


  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`http://localhost:3000/api/v1/orders`);
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`http://localhost:3000/api/v1/orders/${id}`);
  }

  getByUserId(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`http://localhost:3000/api/v1/orders/userorders/${userId}`);
  }

  
}
