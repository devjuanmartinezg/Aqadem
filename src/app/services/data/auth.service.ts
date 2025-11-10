import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4300'; // proxy local

  constructor(private http: HttpClient) {}

  login(codigoHost: string, username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/api/login_check`;
    const body = {
      _username: username,
      _password: password,
      codigoHost: codigoHost
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers }).pipe(
      map((response: any) => {
        if (response && response.token) {
          this.guardarToken(response.token);
          return { success: true, token: response.token };
        } else {
          return { success: false, message: 'Respuesta inesperada del servidor.' };
        }
      }),
      catchError(error => {
        console.error('❌ Error de login:', error);
        let message = 'Error al conectar con el servidor.';
        if (error.status === 401) message = 'Credenciales incorrectas.';
        if (error.status === 504) message = 'El servidor no respondió a tiempo.';
        return of({ success: false, message });
      })
    );
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  eliminarToken() {
    localStorage.removeItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
}
