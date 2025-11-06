import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 🔹 URL base de tu API (ajústala cuando tengas backend)
  private apiUrl = 'https://tu-backend.com/api'; 

  constructor(private http: HttpClient) {}

  /**
   * Login del usuario (listo para usar API real)
   */
  login(codigoCentro: string, username: string, password: string): Observable<any> {
    // 🔹 Ejemplo real cuando tengas backend:
    // return this.http.post(`${this.apiUrl}/login`, { codigoCentro, username, password })
    //   .pipe(
    //     map((response: any) => response),
    //     catchError(error => of({ success: false, message: 'Error en el servidor', error }))
    //   );

    // 🔹 Simulación temporal (sin backend)
    if (codigoCentro === '12345' && username === 'admin' && password === '1234') {
      return of({ success: true, token: 'fake-jwt-token' });
    } else {
      return of({ success: false, message: 'Credenciales incorrectas' });
    }
  }

  /**
   * Ejemplo para guardar el token JWT en localStorage
   */
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
