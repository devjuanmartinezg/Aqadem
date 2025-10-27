// src/app/alumno-detalle/alumno-detalle.page.ts

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; // 👈 Importar para leer la URL
import { DataService } from "../services/data/data.service"; // 👈 Importar servicio

@Component({
  selector: 'app-alumno-detalle',
  templateUrl: './alumno-detalle.page.html',
  styleUrls: ['./alumno-detalle.page.scss'],
  standalone:false,
})
export class AlumnoDetallePage implements OnInit {
  
  alumnoId!: number;
  alumno: any | null = null; // Inicializar como null
  
  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute, // Inyectar
    private dataService: DataService // Inyectar
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id'); 
      if (idParam) {
        this.alumnoId = +idParam;
        this.cargarDetallesAlumno(this.alumnoId);
      }
    });
  }
  
  cargarDetallesAlumno(id: number) {
      // 🌟 LLAMADA AL SERVICIO para buscar el alumno por ID
      this.dataService.getAlumnoById(id).subscribe({
          next: (data) => {
              this.alumno = data;
          },
          error: (err) => {
              console.error('Error al cargar detalles del alumno:', err);
              this.alumno = null; // Mostrar mensaje de error en la UI
          }
      });
  }
  
  goBack() {
    this.navCtrl.back();
  }
}