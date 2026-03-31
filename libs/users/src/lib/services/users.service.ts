import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@org/shared';
import { environment } from '@org/environments';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);
  readonly apiUrl = environment.apiUrl;

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  usersCount(): Observable<{count: number}> {
    return this.http.get<{count: number}>(`${this.apiUrl}/users/get/count`);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/register`, user);
  }


  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
