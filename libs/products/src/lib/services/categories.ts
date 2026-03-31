import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@org/environments';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  readonly http = inject(HttpClient);
  readonly apiUrl = environment.apiUrl;


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}categories`);
  }

  getCategoryById(id: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}categories/${id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}categories/${category.id}`, category );
  }

  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}categories`, category);
  }

  delete(category: Category) {
    return this.http.delete(`${this.apiUrl}categories/${category._id}`);
  }
}
