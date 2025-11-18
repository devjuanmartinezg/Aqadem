import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaseDetalleService {

  private apiUrl = '/api/AQADEM/academia/grupos/alumnos-matriculados';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los alumnos de un grupo específico.
   * @param codigoGrupo El código del grupo (CodigoAlumnosGrupo)
   */
  obtenerAlumnos(codigoGrupo: string): Observable<any[]> {
    const token = localStorage.getItem('auth_token') || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'codigoHost': 'TESTAQ'
    });

    const body = {
      idescuela: 3,                     
      codigotitulacion: "SENIOR",
      codigotitulacionnivel: "SENIOR2",
      codigotitulacionnivelunidad: "SENIOR2",
      codigoalumnosgrupo: codigoGrupo,
      dashboard: false
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(res => {
        const data = res?.data || [];
        return Array.isArray(data) ? data : [];
      })
    );
  }
}
