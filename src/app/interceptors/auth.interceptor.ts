import {inject} from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../pages/auth/service/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Ne pas toucher aux requêtes de connexion
  if (req.url.includes('/connexion/')) {
    return next(req);
  }
  let headersConfig: any = {};
  if (token) {
    headersConfig['Authorization'] = `Bearer ${token}`;
  }
  // Ajouter Content-Type JSON uniquement si ce n'est pas FormData
  if (!(req.body instanceof FormData)) {
    headersConfig['Content-Type'] = 'application/json';
  }
  const cloned = req.clone({ setHeaders: headersConfig });
  return next(cloned);
};
