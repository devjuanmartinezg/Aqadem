import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";

// ✅ Modelo actualizado
export interface PerfilUsuario {
  nombre: string;
  tipo: string;
  grado: string;
  fechaNacimiento: string;
  avatar: string;
  contactosEmergencia: { nombre: string; parentesco: string }[];
  emailsPadres: string[];
  alergias?: string;
  aspectosImportantes?: string[];
}

@Component({
  selector: "app-mensajes-chat-perfil",
  templateUrl: "./mensajes-chat-perfil.page.html",
  styleUrls: ["./mensajes-chat-perfil.page.scss"],
  standalone: false,
})
export class MensajesChatPerfilPage implements OnInit {
  usuario?: PerfilUsuario;


  usuariosDB: (PerfilUsuario & { id: number })[] = [
    {
      id: 1,
      nombre: "Ana García",
      grado: "N/A",
      tipo: "madre",
      avatar: "https://randomuser.me/api/portraits/women/53.jpg",
      contactosEmergencia: [
        { nombre: "Juan Martínez", parentesco: "Padre" },
        { nombre: "Luisa García", parentesco: "Madre" },
      ],
      fechaNacimiento: "",
      alergias: "",
      emailsPadres: ["juan.martinez@email.com", "luisa.garcia@email.com"],
    },
    {
      id: 2,
      nombre: "Pedro Martínez",
      grado: "4º B",
      tipo: "alumno",
      avatar: "https://randomuser.me/api/portraits/men/59.jpg",
      contactosEmergencia: [
        { nombre: "Carlos Martínez", parentesco: "Padre" },
        { nombre: "Marta Díaz", parentesco: "Madre" },
      ],
      fechaNacimiento: "10/10/2013",
      alergias: "Polen",
      emailsPadres: [
        "carlos.martinez@email.com",
        "marta.diaz@email.com",
      ],
      aspectosImportantes: ["Suele tener ansiedad en espacios ruidosos"],
    },
    {
      id: 3,
      nombre: "Carlos Gómez",
      grado: "N/A",
      tipo: "padre",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      contactosEmergencia: [{ nombre: "Ana Gómez", parentesco: "Madre" }],
      fechaNacimiento: "",
      alergias: "",
      emailsPadres: ["ana.gomez@email.com"],
    },
    {
      id: 4,
      nombre: "Laura Fernández",
      grado: "4º A",
      tipo: "alumna",
      avatar: "https://randomuser.me/api/portraits/women/19.jpg",
      contactosEmergencia: [
        { nombre: "Carlos Fernández", parentesco: "Padre" },
        { nombre: "María López", parentesco: "Madre" },
      ],
      fechaNacimiento: "10/09/2012",
      alergias: "Ninguna",
      emailsPadres: [
        "carlos.fernandez@email.com",
        "maria.lopez@email.com",
      ],
      aspectosImportantes: [
        "Le cuesta concentrarse tras el recreo",
        "Evitar comidas con frutos secos",
      ],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = Number(params.get("id"));
      this.usuario = this.usuariosDB.find((u) => u.id === idParam);
    });
  }

  goBack() {
    this.navCtrl.back();
  }
}
