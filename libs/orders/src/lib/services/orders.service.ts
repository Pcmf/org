import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Product } from '../models/product';


import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    readonly http = inject(HttpClient);

    getAll(): Observable<Order[]> {
        return this.http.get<Order[]>(`http://localhost:3000/api/v1/orders`);
    }

    getById(id: string): Observable<Order> {
        return this.http.get<Order>(`http://localhost:3000/api/v1/orders/${id}`);
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`http://localhost:3000/api/v1/products/${id}`);
      }

    getByUserId(userId: string): Observable<Order[]> {
        return this.http.get<Order[]>(`http://localhost:3000/api/v1/orders/userorders/${userId}`);
    }

    update(id: string, order: Order): Observable<Order> {
        return this.http.put<Order>(`http://localhost:3000/api/v1/orders/${id}`, order);
    }

    ordersCount(): Observable<{ count: number }> {
        return this.http.get<{ count: number }>(`http://localhost:3000/api/v1/orders/get/count`);
    }

    totalSales(): Observable<{ totalSales: number }> {
        return this.http.get<{ totalSales: number }>(`http://localhost:3000/api/v1/orders/get/totalsales`);
    }
}
