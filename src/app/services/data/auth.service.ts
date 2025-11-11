import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4300/api/login_check';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  /**
   * Realiza el login enviando _username, _password en body
   * y codigoHost en MAYÚSCULAS en headers.
   */
  login(codigoHost: string, username: string, password: string): Observable<any> {
    const body = {
      _username: username,
      _password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'codigoHost': (codigoHost || 'TESTAQ').toUpperCase()
    });

    console.log('📡 Enviando login con body:', body);
    console.log('📬 Headers enviados →', headers.keys().reduce((acc: any, key: string) => {
      acc[key] = headers.get(key);
      return acc;
    }, {}));

    return this.http.post(this.apiUrl, body, { headers });
  }

  guardarToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    console.log('💾 Token guardado correctamente');
  }

  eliminarToken() {
    localStorage.removeItem(this.tokenKey);
    console.log('🗑️ Token eliminado');
  }

  obtenerToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log('🔍 Token obtenido:', token ? '(existe)' : '(no encontrado)');
    return token;
  }
}
