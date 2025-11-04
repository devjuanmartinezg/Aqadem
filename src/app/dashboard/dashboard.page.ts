import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
  standalone: false,
})
export class DashboardPage implements OnInit {
  // 🔹 Añadimos esta propiedad para que el HTML pueda acceder a ella
  clasesHoy: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
  ) {}

  ngOnInit() {
    const data = {
      data: {
        eventos: [
          {
            Nombre: "JUNIOR 4B",
            Descripcion: "STEPS 5",
            HoraInicio: "18:00",
            HoraFin: "19:00",
            NombreAula: "blue room",
            DiaSemana: "2",
          },
          {
            Nombre: "KIDS 1",
            Descripcion: "BIG WHEEL STARTER",
            HoraInicio: "16:00",
            HoraFin: "17:00",
            NombreAula: "blue room",
            DiaSemana: "2",
          },
          {
            Nombre: "PRIVATE CLASS IRENE",
            Descripcion: "PRIVATE CLASS IRENE",
            HoraInicio: "20:15",
            HoraFin: "21:15",
            NombreAula: "blue room",
            DiaSemana: "2",
          },
          {
            Nombre: "SENIOR 3C",
            Descripcion: "GOLD A2.2",
            HoraInicio: "19:15",
            HoraFin: "20:15",
            NombreAula: "blue room",
            DiaSemana: "2",
          },
        ],
      },
    };

    this.cargarClasesDelDia(data);
  }

  // 🔹 Nuevo método para filtrar las clases del día actual
  cargarClasesDelDia(data: any) {
    const hoy = new Date().getDay(); // 0 = domingo, 1 = lunes, 2 = martes...
    this.clasesHoy = data.data.eventos.filter(
      (evento: any) => Number(evento.DiaSemana) === hoy
    );
  }

  async registrarFaltas() {
    const alert = await this.alertCtrl.create({
      header: "Registrar Faltas",
      message: "Botón clicado: se registrarán las faltas",
      buttons: ["OK"],
    });
    await alert.present();
  }

  testClick() {
    alert("Test click funciona");
  }

  verClase(nombreClase: string) {
    this.router.navigate(["/clase-detalle"], {
      queryParams: { nombre: nombreClase },
    });
  }
}