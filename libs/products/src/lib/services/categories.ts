import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  readonly http = inject(HttpClient);


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories');
  }

  getCategoryVById(id: string): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:3000/api/v1/categories/${id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`http://localhost:3000/api/v1/categories/${category.id}`, category );
  }

  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/api/v1/categories', category);
  }

  delete(category: Category) {
    return this.http.delete(`http://localhost:3000/api/v1/categories/${category._id}`);
  }
}
