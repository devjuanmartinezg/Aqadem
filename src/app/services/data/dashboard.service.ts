import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = '/api/AQADEM/academia/profesores/info/portada'; // endpoint que funciona

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos del dashboard y la info del profesor desde el mismo endpoint.
   */
  obtenerDashboard(): Observable<any> {
    const token = localStorage.getItem('auth_token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'codigoHost': 'TESTAQ'
    });

    return this.http.post<any>(this.apiUrl, {}, { headers }).pipe(
      map(res => {
        const data = res?.data || {};
        return {
          success: res?.success || false,
          data: {
            eventos: data.eventos || [],                  // aquí sí tomamos los eventos reales
            grupos: data.grupos || [],                    // si quieres mostrar info de grupos
            nombreProfesor: data?.Nombre || data?.nombre || 'Profesor',
            totalAlumnos: data.totalAlumnos || 0
          }
        };
      })
    );
  }
}
