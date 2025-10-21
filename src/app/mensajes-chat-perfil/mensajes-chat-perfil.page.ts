import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from '@ionic/angular';

interface PerfilUsuario {
  id: number;
  nombre: string;
  grado: string;
  tipo: "alumno" | "padre" | "madre";
  avatar: string;
  contactosEmergencia: { nombre: string; parentesco: string }[];
  fechaNacimiento: string;
  idEstudiante: string;
  alergias?: string;
  emailsPadres: string[];
}

@Component({
  selector: 'app-mensajes-chat-perfil',
  templateUrl: './mensajes-chat-perfil.page.html',
  styleUrls: ['./mensajes-chat-perfil.page.scss'],
  standalone: false,
})
export class MensajesChatPerfilPage implements OnInit {
  usuario?: PerfilUsuario;

  usuariosDB: PerfilUsuario[] = [
    {
      id: 1,
      nombre: "Ana García",
      grado: "N/A",
      tipo: "madre",
      avatar: "https://randomuser.me/api/portraits/women/53.jpg",
      contactosEmergencia: [
        { nombre: "Juan Martínez", parentesco: "Padre" },
        { nombre: "Luisa García", parentesco: "Madre" }
      ],
      fechaNacimiento: "",
      idEstudiante: "",
      alergias: "",
      emailsPadres: [
        "juan.martinez@email.com",
        "luisa.garcia@email.com"
      ]
    },
    {
      id: 2,
      nombre: "Pedro Martínez",
      grado: "4º B",      
      tipo: "alumno",
      avatar: "https://randomuser.me/api/portraits/men/59.jpg",
      contactosEmergencia: [
        { nombre: "Carlos Martínez", parentesco: "Padre" },
        { nombre: "Marta Díaz", parentesco: "Madre" }
      ],
      fechaNacimiento: "10/10/2013",
      idEstudiante: "#22334",
      alergias: "",
      emailsPadres: [
        "carlos.martinez@email.com",
        "marta.diaz@email.com"
      ]
    },
    {
      id: 3,
      nombre: "Carlos Gómez",
      grado: "N/A",
      tipo: "padre",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      contactosEmergencia: [
        { nombre: "Ana Gómez", parentesco: "Madre" }
      ],
      fechaNacimiento: "",
      idEstudiante: "",
      alergias: "",
      emailsPadres: [
        "ana.gomez@email.com"
      ]
    },
    {
      id: 4,
      nombre: "Laura Fernández",
      grado: "4º A",
      tipo: "alumno",
      avatar: "https://randomuser.me/api/portraits/women/19.jpg",
      contactosEmergencia: [
        { nombre: "Carlos Fernández", parentesco: "Padre" },
        { nombre: "María López", parentesco: "Madre" }
      ],
      fechaNacimiento: "10/09/2012",
      idEstudiante: "#99887",
      alergias: "Ninguna",
      emailsPadres: [
        "carlos.fernandez@email.com",
        "maria.lopez@email.com"
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private navCtrl: NavController) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = Number(params.get('id'));
      this.usuario = this.usuariosDB.find(u => u.id === idParam);
    });
  }

  goBack() {
    this.navCtrl.back();
  }
}
