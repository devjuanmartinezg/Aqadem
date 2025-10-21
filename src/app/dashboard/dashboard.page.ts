import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
  standalone:false,
})
export class DashboardPage implements OnInit {
  constructor(
    private alertCtrl: AlertController,
    private router: Router,
  ) {}

  ngOnInit() {}

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
