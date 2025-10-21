import { Component, type OnInit } from "@angular/core"

interface Mensaje {
  id: number
  nombre: string
  tipo: "alumno" | "padre"
  asunto: string
  hora: string
  esHoy: boolean
  leido: boolean
  avatar: string
}

@Component({
  selector: "app-mensajes",
  standalone: false,
  templateUrl: "./mensajes.page.html",
  styleUrls: ["./mensajes.page.scss"],
})
export class MensajesPage implements OnInit {
  filtroSeleccionado = "todos"
  mensajes: Mensaje[] = []
  mensajesFiltrados: Mensaje[] = []

  ngOnInit() {
    this.mensajes = [
      {
        id: 1,
        nombre: "Ana García (Madre)",
        tipo: "padre",
        asunto: "Consulta sobre la tarea de...",
        hora: "10:45 AM",
        esHoy: true,
        leido: false,
        avatar: "https://randomuser.me/api/portraits/women/53.jpg",
      },
      {
        id: 2,
        nombre: "Pedro Martínez",
        tipo: "alumno",
        asunto: "Duda sobre el proyecto final",
        hora: "Ayer",
        esHoy: false,
        leido: true,
        avatar: "https://randomuser.me/api/portraits/men/59.jpg",
      },
      {
        id: 3,
        nombre: "Carlos Gómez (Padre)",
        tipo: "padre",
        asunto: "Justificante de ausencia",
        hora: "Ayer",
        esHoy: false,
        leido: true,
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      {
        id: 4,
        nombre: "Laura Fernández",
        tipo: "alumno",
        asunto: "Entrega de trabajo práctico",
        hora: "Hace 2 días",
        esHoy: false,
        leido: true,
        avatar: "https://randomuser.me/api/portraits/women/19.jpg",
      },
    ]

    this.filtrarMensajes()
  }

  filtrarMensajes() {
    if (this.filtroSeleccionado === "todos") {
      this.mensajesFiltrados = this.mensajes
    } else if (this.filtroSeleccionado === "no-leidos") {
      this.mensajesFiltrados = this.mensajes.filter((m) => !m.leido)
    } else if (this.filtroSeleccionado === "alumnos") {
      this.mensajesFiltrados = this.mensajes.filter((m) => m.tipo === "alumno")
    } else if (this.filtroSeleccionado === "padres") {
      this.mensajesFiltrados = this.mensajes.filter((m) => m.tipo === "padre")
    }
  }
}

export default MensajesPage
