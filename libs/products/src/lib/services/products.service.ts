import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly http = inject(HttpClient);


  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/v1/products');
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/v1/products/${id}`);
  }

  create(product: FormData): Observable<Product> {
    return this.http.post<Product>(`http://localhost:3000/api/v1/products`, product);
  }

  update(id: string, product: FormData): Observable<Product> {
    return this.http.put<Product>(`http://localhost:3000/api/v1/products/${id}`, product );
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/api/v1/products', product);
  }

  delete(id: string) {
    return this.http.delete(`http://localhost:3000/api/v1/products/${id}`);
  }
}
