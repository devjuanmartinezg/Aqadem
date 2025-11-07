import { Component, type OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
  standalone: false,
})
export class PerfilPage implements OnInit {
  usuario = {
    nombre: "Alejandro Martínez",
    email: "alex.martinez@colegio.edu",
    telefono: "+34 600 123 456",
    avatar: "https://via.placeholder.com/150",
    asignaturas: ["Matemáticas 1º ESO", "Física 2º Bachillerato", "Tecnología 3º ESO"],
    biografia:
      "Profesor apasionado con más de 10 años de experiencia en la enseñanza de ciencias. Comprometido con el desarrollo académico y personal de mis alumnos a través de métodos innovadores y un enfoque práctico.",
  };

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async editarPerfil() {
    const modal = await this.modalCtrl.create({
      component: EditarPerfilModalComponent,
      componentProps: {
        usuario: this.usuario,
      },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.usuario = { ...this.usuario, ...data };
    }
  }

  cambiarFoto() {
    console.log("Cambiar foto");
  }

  // ========================
  // CERRAR SESIÓN
  // ========================
  cerrarSesion() {
    console.log("Cerrar sesión");

    // 1️⃣ Borrar token o datos de sesión
    localStorage.removeItem('token'); // Asegúrate de usar la misma clave que tu AuthGuard
    // localStorage.clear(); // opcional: borra todo

    // 2️⃣ Redirigir al login
    this.navCtrl.navigateRoot("/login");
  }
}

@Component({
  selector: "app-editar-perfil-modal",
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="cerrar()">Cancelar</ion-button>
        </ion-buttons>
        <ion-title>Editar Perfil</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="guardar()" strong>Guardar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Nombre</ion-label>
        <ion-input [(ngModel)]="usuarioEditado.nombre" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input [(ngModel)]="usuarioEditado.email" type="email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Teléfono</ion-label>
        <ion-input [(ngModel)]="usuarioEditado.telefono" type="tel"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Biografía</ion-label>
        <ion-textarea [(ngModel)]="usuarioEditado.biografia"></ion-textarea>
      </ion-item>
    </ion-content>
  `,
  styleUrls: ["./perfil.page.scss"],
  standalone: false,
})
export class EditarPerfilModalComponent {
  usuario: any;
  usuarioEditado: any;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.usuarioEditado = { ...this.usuario };
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    this.modalCtrl.dismiss(this.usuarioEditado);
  }
}
