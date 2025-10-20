import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  async registrarFaltas() {
    const alert = await this.alertCtrl.create({
      header: 'Registrar Faltas',
      message: 'Botón clicado: se registrarán las faltas',
      buttons: ['OK']
    });
    await alert.present();
  }

  testClick() {
    alert('Test click funciona');
  }
}
