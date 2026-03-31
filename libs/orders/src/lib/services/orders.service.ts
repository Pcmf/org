import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order, OrderItem } from '@org/shared';
import { Product } from '../models/product';


import { Observable } from 'rxjs';
import { environment } from '@org/environments';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    readonly http = inject(HttpClient);
    readonly apiUrl = environment.apiUrl;

    getAll(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}orders`);
    }

    getById(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}orders/${id}`);
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}products/${id}`);
      }

    getByUserId(userId: string): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}orders/userorders/${userId}`);
    }

    insertOrder(order: Order): Observable<Order> {
      return this.http.post<Order>(`${this.apiUrl}orders`, order);
    }

    update(id: string, order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.apiUrl}orders/${id}`, order);
    }

    ordersCount(): Observable<{ count: number }> {
        return this.http.get<{ count: number }>(`${this.apiUrl}orders/get/count`);
    }

    totalSales(): Observable<{ totalSales: number }> {
        return this.http.get<{ totalSales: number }>(`${this.apiUrl}orders/get/totalsales`);
    }

    createCheckoutSession(orderItems: OrderItem[]) {
      return this.http.post(`${this.apiUrl}orders/create-checkout-session`, orderItems);
    }

    cacheOrderData(order: Order | null): void {
      localStorage.setItem('pendingOrder', JSON.stringify(order));
    }

    getCachedOrderData(): Order | null {
      const data = localStorage.getItem('pendingOrder');
      return data ? JSON.parse(data) : null;
    }

}
