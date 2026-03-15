import { HttpInterceptorFn } from '@angular/common/http';
import { Localstorage } from './localstorage';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const localstorageService = inject(Localstorage);

  const token = localstorageService.getToken();
  const isApiUrl = req.url.startsWith('http://localhost:3000/api/v1');
  if(token && isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  return next(req);
};
