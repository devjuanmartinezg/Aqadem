import { Component, OnInit } from '@angular/core';

interface Mensaje {
  id: number;
  nombre: string;
  tipo: 'alumno' | 'padre';
  asunto: string;
  hora: string;
  avatar: string;
}

@Component({
  selector: 'app-mensajes',
  standalone: false,
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class InboxPage implements OnInit {
  filtroSeleccionado: string = 'todos';
  mensajes: Mensaje[] = [];
  mensajesFiltrados: Mensaje[] = [];

  ngOnInit() {
    this.mensajes = [
      {
        id: 1,
        nombre: 'Ana García (Madre)',
        tipo: 'padre',
        asunto: 'Consulta sobre la tarea de...',
        hora: '10:45 AM',
        avatar: 'assets/avatars/ana.png'
      },
      {
        id: 2,
        nombre: 'Pedro Martínez',
        tipo: 'alumno',
        asunto: 'Duda sobre el proyecto final',
        hora: 'Ayer',
        avatar: 'assets/avatars/pedro.png'
      },
      {
        id: 3,
        nombre: 'Carlos Gómez (Padre)',
        tipo: 'padre',
        asunto: 'Justificante de ausencia',
        hora: 'Ayer',
        avatar: 'assets/avatars/default.png'
      },
      {
        id: 4,
        nombre: 'Laura Fernández',
        tipo: 'alumno',
        asunto: 'Entrega de trabajo práctico',
        hora: 'Hace 2 días',
        avatar: 'assets/avatars/default.png'
      },
    ];

    this.filtrarMensajes();
  }

  filtrarMensajes() {
    if (this.filtroSeleccionado === 'todos') {
      this.mensajesFiltrados = this.mensajes;
    } else if (this.filtroSeleccionado === 'alumnos') {
      this.mensajesFiltrados = this.mensajes.filter(m => m.tipo === 'alumno');
    } else if (this.filtroSeleccionado === 'padres') {
      this.mensajesFiltrados = this.mensajes.filter(m => m.tipo === 'padre');
    }
  }
}
