import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoginUser {
  user: string;
  token: string;
};

@Injectable({
  providedIn: 'root',
})
export class Auth {
  readonly http = inject(HttpClient);

  apiUrlAuth = 'http://localhost:3000/api/v1/users';

  login(email: string, password: string): Observable<LoginUser> {
    return this.http.post<LoginUser>(`${this.apiUrlAuth}/login`, { email, password});
  }

  register(email: string, password: string): Observable<LoginUser> {
    return this.http.post<LoginUser>(`${this.apiUrlAuth}/register`, { email, password});
  }

}
