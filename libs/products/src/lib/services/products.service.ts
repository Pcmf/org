import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);


  getAll(categoryIds?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if(categoryIds) {
      params = params.append('categories', categoryIds.join(','));
    }
    return this.http.get<Product[]>('http://localhost:3000/api/v1/products', {params});
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/v1/products/${id}`);
  }

  getFeatured(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/api/v1/products/get/featured`);
  }

  getByCategory(categoryId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/api/v1/products/get/category/${categoryId}`);
  }

  getFeaturedByCategoryAndCount(categoryId: string, count=10): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/api/v1/products/get/featured/${categoryId}/${count}`);
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

  getCount(): Observable<{count: number}> {
    return this.http.get<{count: number}>(`http://localhost:3000/api/v1/products/get/count`);
  }
}
