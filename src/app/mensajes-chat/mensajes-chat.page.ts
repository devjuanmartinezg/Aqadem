import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from '@ionic/angular';

interface MensajeChat {
  texto: string;
  hora: string;
  fromMe: boolean;
  userId: number;
}

interface Usuario {
  id: number;
  nombre: string;
  tipo: "alumno" | "padre" | "madre" | "usuario";
  avatar: string;
}

@Component({
  selector: 'app-mensajes-chat',
  templateUrl: './mensajes-chat.page.html',
  styleUrls: ['./mensajes-chat.page.scss'],
  standalone: false,
})
export class MensajesChatPage implements OnInit {
  mensajeActual?: Usuario;
  conversacion: MensajeChat[] = [];
  nuevoMensaje = '';

  usuarios: Usuario[] = [
    { id: 1, nombre: "Ana García", tipo: "madre", avatar: "https://randomuser.me/api/portraits/women/53.jpg" },
    { id: 2, nombre: "Pedro Martínez", tipo: "alumno", avatar: "https://randomuser.me/api/portraits/men/59.jpg" },
    { id: 3, nombre: "Carlos Gómez", tipo: "padre", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
    { id: 4, nombre: "Laura Fernández", tipo: "alumno", avatar: "https://randomuser.me/api/portraits/women/19.jpg" },
    { id: 99, nombre: "Yo mismo", tipo: "usuario", avatar: "https://randomuser.me/api/portraits/men/75.jpg" }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mensajeActual = this.usuarios.find(u => u.id === id) || this.usuarios.find(u => u.id === 99);

    this.conversacion = [
      { texto: "Hola, ¿cómo estás?", hora: "10:00 AM", fromMe: false, userId: 1 },
      { texto: "Bien, gracias. ¿Y tú?", hora: "10:02 AM", fromMe: true, userId: 99 },
      { texto: "Todo bien, quería preguntarte sobre la tarea.", hora: "10:05 AM", fromMe: false, userId: 1 },
    ];
  }

  enviarMensaje() {
    if (!this.nuevoMensaje.trim()) return;
    this.conversacion.push({
      texto: this.nuevoMensaje,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fromMe: true,
      userId: 99
    });
    this.nuevoMensaje = '';
  }

  verPerfil() {
    if (this.mensajeActual) {
      this.router.navigate(['/mensajes-chat-perfil', this.mensajeActual.id]);
    }
  }

  getAvatar(userId: number): string {
    const user = this.usuarios.find(u => u.id === userId);
    return user ? user.avatar : 'assets/avatar-default.png';
  }

  goBack() {
    this.navCtrl.back();
  }

  goToPerfil(userId: number) {
    this.router.navigate(['/mensajes-chat-perfil', userId]);
  }
}
