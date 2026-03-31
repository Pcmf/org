import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@org/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  readonly apiUrl = environment.apiUrl;


  getAll(categoryIds?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if(categoryIds) {
      params = params.append('categories', categoryIds.join(','));
    }
    return this.http.get<Product[]>(`${this.apiUrl}products`, {params});
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}products/${id}`);
  }

  getFeatured(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products/get/featured`);
  }

  getByCategory(categoryId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products/get/category/${categoryId}`);
  }

  getFeaturedByCategoryAndCount(categoryId: string, count=10): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products/get/featured/${categoryId}/${count}`);
  }

  create(product: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}products`, product);
  }

  update(id: string, product: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}products/${id}`, product );
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}products`, product);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}products/${id}`);
  }

  getCount(): Observable<{count: number}> {
    return this.http.get<{count: number}>(`${this.apiUrl}products/get/count`);
  }
}
