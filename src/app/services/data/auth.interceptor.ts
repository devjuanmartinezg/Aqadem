import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.obtenerToken();
    let authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Intentar refresh token
          return this.auth.refreshToken().pipe(
            switchMap((res: any) => {
              const newToken = res.token;
              const newRefresh = res.refresh_token || this.auth.obtenerRefreshToken();
              this.auth.guardarTokens(newToken, newRefresh);

              const clonedReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
              return next.handle(clonedReq);
            }),
            catchError(err => {
              this.auth.eliminarToken();
              this.router.navigate(['/login']);
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
