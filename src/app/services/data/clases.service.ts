import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private apiUrl = '/api/AQADEM/academia/profesores/info/portada';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los grupos asociados al profesor desde el endpoint del dashboard
   */
  obtenerGrupos(): Observable<any[]> {
    const token = localStorage.getItem('auth_token') || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'codigoHost': 'TESTAQ'
    });

    // POST vacío, igual que dashboard
    return this.http.post<any>(this.apiUrl, {}, { headers }).pipe(
      map(res => {
        const grupos = res?.data?.grupos || [];
        return Array.isArray(grupos) ? grupos : [];
      })
    );
  }
}
