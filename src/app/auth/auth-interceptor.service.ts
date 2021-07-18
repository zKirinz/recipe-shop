import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          next.handle(req);
        }

        const token = user ? (user.token ? user.token : '') : '';
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
