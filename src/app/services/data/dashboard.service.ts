import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:4300/api/AQADEM'; // Proxy local

  constructor(private http: HttpClient, private auth: AuthService) {}

  /**
   * Construye headers incluyendo Authorization si hay token
   */
  private getHeaders(): HttpHeaders {
    const token = this.auth.obtenerToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  /**
   * Obtiene los datos del dashboard (clases, mensajes, etc.)
   */
  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, { headers: this.getHeaders() }).pipe(
      map((res: any) => ({
        success: true,
        data: res.data || {},
        message: res.message || ''
      })),
      catchError(err => {
        console.error('❌ Error dashboard:', err);
        return of({ success: false, data: {}, message: 'No se pudo cargar el dashboard.' });
      })
    );
  }

  /**
   * Obtiene información básica del profesor autenticado
   */
  getProfesorInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profesor`, { headers: this.getHeaders() }).pipe(
      map((res: any) => ({
        success: true,
        data: res.data || {},
        message: res.message || ''
      })),
      catchError(err => {
        console.error('❌ Error profesor:', err);
        return of({ success: false, data: {}, message: 'No se pudo cargar la información del profesor.' });
      })
    );
  }

  /**
   * Obtiene información de un profesor por ID
   */
  getProfesor(idProfesor: string): Observable<any> {
    const url = `${this.apiUrl}/profesores/${idProfesor}`;
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => ({
        success: true,
        data: res.data || {},
        message: res.message || ''
      })),
      catchError(err => {
        console.error('❌ Error profesor:', err);
        return of({ success: false, data: {}, message: 'No se pudo cargar la información del profesor.' });
      })
    );
  }
}
