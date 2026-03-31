import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@org/shared';
import { environment } from '@org/environments';

export interface LoginUser {
  user: User;
  token: string;
};

@Injectable({
  providedIn: 'root',
})
export class Auth {
  readonly http = inject(HttpClient);
  readonly apiUrl = environment.apiUrl;

  apiUrlAuth = `${this.apiUrl}/users`;

  login(email: string, password: string): Observable<LoginUser> {
    return this.http.post<LoginUser>(`${this.apiUrlAuth}/login`, { email, password});
  }

  register(email: string, password: string): Observable<LoginUser> {
    return this.http.post<LoginUser>(`${this.apiUrlAuth}/register`, { email, password});
  }

}
