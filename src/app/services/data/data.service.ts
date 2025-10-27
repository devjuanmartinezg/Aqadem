// src/app/services/data/data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Alumno {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
}

export interface Clase {
  claseId: number;
  nombreClase: string;
  alumnos: Alumno[];
}

@Injectable({
  providedIn: 'root'
})

export class DataService { // Asegúrate que tu clase se llame DataService

  // Ruta a tu archivo JSON
  private readonly alumnosDataPath = 'assets/data/alumnos.json';

  constructor(private http: HttpClient) { }

  getClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.alumnosDataPath);
  }

  /**
   * Obtiene la lista de alumnos buscando en el JSON local por el ID de la clase.
   */
  getAlumnosByClaseId(claseId: number): Observable<any[]> {
    return this.http.get<any[]>(this.alumnosDataPath).pipe(
      map(clases => {
        // Busca el objeto de clase que coincida con el 'claseId'
        const claseEncontrada = clases.find(clase => clase.claseId === claseId);
        
        // Devuelve el array de alumnos, o un array vacío si no se encuentra
        return claseEncontrada ? claseEncontrada.alumnos : [];
      })
    );
  }

  getAlumnoById(alumnoId: number): Observable<any | null> {
        // La ruta a tu JSON (ajusta si es necesario)
        return this.http.get<any[]>(this.alumnosDataPath).pipe(
            map(clases => {
                // Recorrer todas las clases para encontrar al alumno
                for (const clase of clases) {
                    // Usamos 'any' en el find si no tenemos tipado fuerte, o tipamos con 'alumno'
                    const alumnoEncontrado = clase.alumnos.find((a: any) => a.id === alumnoId); 
                    if (alumnoEncontrado) {
                        return alumnoEncontrado;
                    }
                }
                // Si el alumno no se encuentra en ninguna clase
                return null;
            })
        );
  }

  getClaseDetalle(claseId: number): Observable<any | null> {
    // La ruta a tu JSON (ajusta si es necesario)
    const alumnosDataPath = 'assets/data/alumnos.json'; 
    
    // Carga todo el JSON
    return this.http.get<any[]>(alumnosDataPath).pipe(
      map(clases => {
        // Busca el objeto de clase completo que coincida con el ID
        const claseEncontrada = clases.find(clase => clase.claseId === claseId);
        
        // Devuelve el objeto completo de la clase o null
        return claseEncontrada || null;
      })
    );
  }
}