import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { DataService } from "../services/data/data.service";

@Component({
  selector: "app-clase-detalle",
  templateUrl: "./clase-detalle.page.html",
  styleUrls: ["./clase-detalle.page.scss"],
  standalone: false,
})
export default class ClaseDetallePage implements OnInit {
  claseNombre = "";
  claseId = "";
  alumnos: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idParam = params.get("id");
      if (idParam) {
        this.claseId = decodeURIComponent(idParam);
        console.log("📘 Cargando clase con código:", this.claseId);

        this.cargarAlumnosDesdeServicio();
      }
    });
  }

  cargarAlumnosDesdeServicio() {
    this.dataService.getClaseDetalle(this.claseId).subscribe({
      next: (alumnos) => {
        console.log("📗 Alumnos recibidos:", alumnos);
        if (alumnos && alumnos.length > 0) {
          this.alumnos = alumnos;
          this.claseNombre = this.claseId;
        } else {
          this.claseNombre = this.claseId + " (Sin alumnos)";
          this.alumnos = [];
        }
      },
      error: (err) => {
        console.error("❌ Error al cargar alumnos:", err);
        this.claseNombre = this.claseId + " (Error)";
        this.alumnos = [];
      },
    });
  }

  verDetallesAlumno(alumno: any) {
    const alumnoId = alumno.ID || alumno.id;
    if (alumnoId) {
      console.log("Navegando a detalles del alumno con ID:", alumnoId);
      this.router.navigate(["/alumno-detalle", alumnoId]);
    } else {
      console.warn("⚠️ No se encontró ID en el alumno:", alumno);
    }
  }

  irATomarAsistencia() {
    if (this.claseId) {
      console.log("🟢 Navegando a pasar lista para:", this.claseId);
      this.router.navigate(["/pasar-lista", this.claseId]);
    } else {
      alert("Error: No se pudo obtener el ID de la clase para pasar lista.");
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
