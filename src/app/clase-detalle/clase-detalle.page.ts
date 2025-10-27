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
  claseNombre = "Biología y Geología - 3º B";
  

  claseId: number = 0;
  alumnos: any[] = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private dataService: DataService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Suscribirse a los parámetros de la URL para obtener el ID
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id'); 
      if (idParam) {
        this.claseId = +idParam; // Convertir a número
        this.cargarAlumnos(); 
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
    // 🌟 Implementación de la navegación por ID
    console.log('Navegando a detalles del alumno con ID:', alumno.id);
    this.router.navigate(['/alumno-detalle', alumno.id]);
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
