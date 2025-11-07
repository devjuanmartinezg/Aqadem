import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = '/api/AQADEM/academia/profesores/info/portada'; // ✅ SIN repetir el endpoint

  constructor(private http: HttpClient) {}

  getDashboardData(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('❌ Error al cargar el dashboard:', error);
        return throwError(() => error);
      })
    );
  }
}
