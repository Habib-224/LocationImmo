import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userOnline = JSON.parse(localStorage.getItem('userOnline') || '');

    // Assurez-vous que userOnline et userOnline.authorization sont définis
    if ( userOnline && userOnline.authorization && userOnline.authorization.token) {
      const token = userOnline.authorization.token;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
