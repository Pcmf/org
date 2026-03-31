import { HttpInterceptorFn } from '@angular/common/http';
import { LocalstorageService } from './localstorage';
import { inject } from '@angular/core';
import { environment } from '@org/environments';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const localstorageService = inject(LocalstorageService);
  const apiUrl = environment.apiUrl;

  const token = localstorageService.getToken();
  const isApiUrl = req.url.startsWith(`${apiUrl}/`);
  if(token && isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  return next(req);
};
