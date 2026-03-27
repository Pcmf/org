import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/v1/users');
  }
  getById(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/v1/users/${id}`);
  }

  usersCount(): Observable<{count: number}> {
    return this.http.get<{count: number}>(`http://localhost:3000/api/v1/users/get/count`);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/api/v1/users/${user.id}`, user);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:3000/api/v1/users/register`, user);
  }


  delete(id: string) {
    return this.http.delete(`http://localhost:3000/api/v1/users/${id}`);
  }
}
