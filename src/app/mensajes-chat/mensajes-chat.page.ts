import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IonContent, NavController } from "@ionic/angular";

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
  selector: "app-mensajes-chat",
  templateUrl: "./mensajes-chat.page.html",
  styleUrls: ["./mensajes-chat.page.scss"],
  standalone: false,
})
export class MensajesChatPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  mensajeActual?: Usuario;
  conversacion: MensajeChat[] = [];
  nuevoMensaje = "";

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
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.mensajeActual =
      this.usuarios.find((u) => u.id === id) ||
      this.usuarios.find((u) => u.id === 99);

    this.conversacion = [
      { texto: "Hola, ¿cómo estás?", hora: "10:00", fromMe: false, userId: 1 },
      { texto: "Bien, gracias. ¿Y tú?", hora: "10:02", fromMe: true, userId: 99 },
      { texto: "Todo bien, quería preguntarte sobre la tarea.", hora: "10:05", fromMe: false, userId: 1 },
    ];

    // Aseguramos scroll al cargar
    setTimeout(() => this.scrollToBottom(), 300);
  }

  enviarMensaje() {
    if (!this.nuevoMensaje.trim()) return;

    const mensaje: MensajeChat = {
      texto: this.nuevoMensaje,
      hora: this.obtenerHora(),
      fromMe: true,
      userId: 99,
    };

    this.conversacion.push(mensaje);
    this.nuevoMensaje = "";

    // Hacemos scroll hacia abajo tras renderizar
    setTimeout(() => this.scrollToBottom(), 150);

    // Simulación opcional de respuesta automática (puedes quitarlo)
    setTimeout(() => {
      this.recibirMensaje("Entendido, gracias por tu mensaje 😊");
    }, 1000);
  }

  recibirMensaje(texto: string) {
    const respuesta: MensajeChat = {
      texto,
      hora: this.obtenerHora(),
      fromMe: false,
      userId: this.mensajeActual?.id || 1,
    };

    this.conversacion.push(respuesta);

    // Scroll suave tras recibir
    setTimeout(() => this.scrollToBottom(), 150);
  }

  scrollToBottom() {
    try {
      this.content.scrollToBottom(300);
    } catch (err) {
      console.warn("No se pudo hacer scroll:", err);
    }
  }

  obtenerHora(): string {
    const ahora = new Date();
    return `${ahora.getHours().toString().padStart(2, "0")}:${ahora
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  verPerfil() {
    if (this.mensajeActual) {
      this.router.navigate(["/mensajes-chat-perfil", this.mensajeActual.id]);
    }
  }

  getAvatar(userId: number): string {
    const user = this.usuarios.find((u) => u.id === userId);
    return user ? user.avatar : "assets/avatar-default.png";
  }

  goBack() {
    this.navCtrl.back();
  }

  goToPerfil(userId: number) {
    this.router.navigate(["/mensajes-chat-perfil", userId]);
  }
}
