import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { NavController } from "@ionic/angular"
import { DataService } from "../services/data/data.service"
import { Router } from "@angular/router"

@Component({
  selector: "app-clase-detalle",
  templateUrl: "./clase-detalle.page.html",
  styleUrls: ["./clase-detalle.page.scss"],
  standalone: false,
})
export default class ClaseDetallePage implements OnInit {
  claseNombre = "";
  

  claseId: string = "";
  alumnos: any[] = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private dataService: DataService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        // Ya no es numérico, puede ser texto
        this.claseId = decodeURIComponent(idParam);
        console.log('📘 Cargando clase con código:', this.claseId);

        this.cargarAlumnos();
        this.dataService.getClaseDetalle(this.claseId).subscribe({
          next: (alumnos) => {
            if (alumnos && alumnos.length > 0) {
              this.alumnos = alumnos;
              // Usa el código de clase como nombre de cabecera
              this.claseNombre = this.claseId;
            } else {
              this.claseNombre = this.claseId + ' (Sin alumnos)';
              this.alumnos = [];
            }
          },
          error: (err) => {
            console.error('❌ Error al cargar alumnos:', err);
            this.claseNombre = this.claseId + ' (Error)';
          }
        });
      }
    });
  }


  cargarAlumnos() {
    // Llamar al método del DataService
    this.dataService.getAlumnosByClaseId(this.claseId).subscribe({
      next: (alumnos) => {
        // Los datos del JSON llegan aquí y se asignan a la variable 'alumnos'
        this.alumnos = alumnos; 
        console.log('Alumnos cargados para la clase', this.claseId, ':', this.alumnos);
      },
      error: (err) => {
        console.error('Error al cargar alumnos:', err);
        // Manejo de errores si la carga del JSON falla
      }
    });
  }

  verDetallesAlumno(alumno: any) {
    const alumnoId = alumno.ID || alumno.id; // acepta ambas variantes
    if (alumnoId) {
      console.log('Navegando a detalles del alumno con ID:', alumnoId);
      this.router.navigate(['/alumno-detalle', alumnoId]);
    } else {
      console.warn('⚠️ No se encontró ID en el alumno:', alumno);
    }
  }


  irATomarAsistencia() {
    if (this.claseId) {
      console.log('Navegando a pasar lista para la clase ID:', this.claseId);
      // 🌟 CAMBIO AQUÍ: Usar 'pasar-lista'
      this.router.navigate(['/pasar-lista', this.claseId]); 
    } else {
      alert('Error: No se pudo obtener el ID de la clase para pasar lista.');
    }
  }

  goBack() {
    this.navCtrl.back()
  }

}
