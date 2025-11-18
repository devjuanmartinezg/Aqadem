// src/app/services/data/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly basePath = 'assets/data/';

  private API_URL = '';

  constructor(private http: HttpClient) {}
  
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { email, password });
  }

  // Ejemplo de API protegida
  getUserProfile(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.API_URL}/profile`, { headers });
  }

  /**
   * 📘 Devuelve la lista de clases desde portada.json
   */
  getClases(): Observable<any[]> {
    return this.http.get<any>(`${this.basePath}portada.json`).pipe(
      map(res => res.data?.grupos || [])
    );
  }

  /**
   * 📘 Devuelve el detalle de una clase específica 
   */
  getClaseDetalle(codigoClase: string): Observable<any[]> {
    if (!codigoClase) {
      console.warn('⚠️ getClaseDetalle llamado sin código de clase');
      return of([]);
    }

    const codigoNormalizado = codigoClase.replace(/\s+/g, '').toUpperCase();
    const fileName = `${this.basePath}alumnos-grupo-${codigoNormalizado}.json`;

    console.log('📘 Cargando alumnos desde:', fileName);

    return this.http.get<any>(fileName).pipe(
      map(res => res.data || []), // 👈 aquí extraemos el array real
      catchError(err => {
        console.error('❌ Error al cargar alumnos para', codigoNormalizado, err);
        return of([]);
      })
    );
  }


  /*
   * 👩‍🏫 Devuelve los alumnos pertenecientes a una clase (por su código textual)
 */
  getAlumnosByClaseId(codigoClase: string): Observable<any[]> {
    if (!codigoClase) {
      console.warn('⚠️ getAlumnosByClaseId llamado sin código de clase');
      return of([]);
    }

    const codigoNormalizado = codigoClase.replace(/\s+/g, '').toUpperCase();
    const fileName = `${this.basePath}alumnos-grupo-${codigoNormalizado}.json`;

    console.log('📘 Cargando alumnos desde:', fileName);

    return this.http.get<any>(fileName).pipe(
      map(res => res.data || []), // 👈 corrige la estructura real
      catchError((err: any) => {
        console.error('❌ Error al cargar alumnos para', codigoNormalizado, err);
        return of([]);
      })
    );
  }


  /**
   * 👤 Devuelve un alumno específico por su ID (buscando en todos los grupos)
   */
  getAlumnoById(alumnoId: number): Observable<any | null> {
    return this.http.get<any>(`${this.basePath}portada.json`).pipe(
      switchMap(res => {
        const grupos = res.data.grupos;
        const observables = grupos.map((grupo: any) => {
          const codigo = grupo.Codigo.replace(/\s+/g, '').toUpperCase();
          const fileName = `${this.basePath}alumnos-grupo-${codigo}.json`;

          return this.http.get<any>(fileName).pipe(
            map(fileData => {
              const alumnos = fileData.data || [];
              return alumnos.find((a: any) => +a.ID === alumnoId) || null;
            }),
            catchError(() => of(null))
          );
        });

        // Buscar en el primer grupo que lo contenga
        return new Observable<any | null>(subscriber => {
          let encontrado: any = null;
          let pendientes = observables.length;

          observables.forEach((obs: Observable<any | null>) => {
            obs.subscribe(result => {
              if (result && !encontrado) {
                encontrado = result;
                subscriber.next(encontrado);
                subscriber.complete();
              }
              if (--pendientes === 0 && !encontrado) {
                subscriber.next(null);
                subscriber.complete();
              }
            });
          });
        });
      })
    );
  }

}
