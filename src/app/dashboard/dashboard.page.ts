import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
  standalone: false,
})
export class DashboardPage implements OnInit {
  clasesHoy: any[] = [];
  totalAlumnos: number = 0;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }


  cargarDatos() {
    this.http.get("assets/data/portada.json").subscribe({
      next: (response: any) => {
        if (response?.data) {
          const data = response.data;

          // Guardamos total de alumnos
          this.totalAlumnos = Number(data.totalAlumnos || 0);

          // Tomamos las clases directamente de los eventos del día
          this.clasesHoy = data.eventos.map((evento: any) => ({
            Nombre: evento.Nombre,
            Descripcion: evento.Descripcion,
            HoraInicio: evento.HoraInicio,
            HoraFin: evento.HoraFin,
            NombreAula: evento.NombreAula,
            DiaSemana: evento.DiaSemana,
          }));
        }
      },
      error: (err) => {
        console.error("Error cargando datos del dashboard:", err);
      },
    });
  }

  async registrarFaltas() {
    const alert = await this.alertCtrl.create({
      header: "Registrar Faltas",
      message: "Botón clicado: se registrarán las faltas",
      buttons: ["OK"],
    });
    await alert.present();
  }

  verClase(nombreClase: string) {
    this.router.navigate(["/clase-detalle", encodeURIComponent(nombreClase)]);
  }

  verTodasClases() {
    this.router.navigate(["/tabs/clases"]);
  }

  verTodosMensajes() {
    this.router.navigate(['/tabs/mensajes']);
  }



}
