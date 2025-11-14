import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ClaseDetalleService } from "../services/data/clase-detalle.service";

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
  loading = true;
  apiStatus = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private claseDetalleService: ClaseDetalleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idParam = params.get("id");
      if (idParam) {
        this.claseId = decodeURIComponent(idParam);
        console.log("📘 Cargando clase con código:", this.claseId);
        this.cargarAlumnos();
      }
    });
  }

  cargarAlumnos() {
    this.loading = true;
    this.apiStatus = "";

    this.claseDetalleService.obtenerAlumnos(this.claseId).subscribe({
      next: (alumnos) => {
        console.log("📗 Alumnos recibidos:", alumnos);
        this.alumnos = alumnos || [];

        if (this.alumnos.length > 0) {
          this.claseNombre = this.claseId;
          this.apiStatus = `✅ ${this.alumnos.length} alumnos encontrados`;
        } else {
          this.claseNombre = `${this.claseId} (Sin alumnos)`;
          this.apiStatus = "⚠️ No se encontraron alumnos";
        }

        this.loading = false;
      },
      error: (err) => {
        console.error("❌ Error al cargar alumnos:", err);
        this.alumnos = [];
        this.claseNombre = `${this.claseId} (Error)`;
        this.apiStatus = `❌ Error del servidor: ${err.status || "desconocido"}`;
        this.loading = false;
      },
    });
  }

  verDetallesAlumno(alumno: any) {
    const alumnoId = alumno.ID || alumno.id;
    if (alumnoId) {
      this.router.navigate(["/alumno-detalle", alumnoId]);
    }
  }

  irATomarAsistencia() {
    if (this.claseId) {
      this.router.navigate(["/pasar-lista", this.claseId]);
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
