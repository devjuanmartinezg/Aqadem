import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4300/api/login_check';
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private http: HttpClient) {}

  login(codigoHost: string, username: string, password: string): Observable<any> {
    const body = { _username: username, _password: password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'codigoHost': (codigoHost || 'TESTAQ').toUpperCase()
    });

    return this.http.post(this.apiUrl, body, { headers });
  }

  guardarTokens(authToken: string, refreshToken: string) {
    localStorage.setItem(this.tokenKey, authToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  obtenerRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  eliminarToken() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  refreshToken(): Observable<any> {
    const refresh = this.obtenerRefreshToken();
    if (!refresh) return throwError(() => new Error('No hay refresh token'));
    return this.http.post('http://localhost:4300/api/token/refresh', { refresh_token: refresh });
  }
}
