import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario = {
    nombre: 'Alejandro Martínez',
    email: 'alex.martinez@colegio.edu',
    telefono: '+34 600 123 456',
    avatar: 'assets/avatars/alex.png',
    asignaturas: ['Matemáticas 1º ESO', 'Física 2º Bachillerato', 'Tecnología 3º ESO'],
    biografia:
      'Profesor apasionado con más de 10 años de experiencia en la enseñanza de ciencias. Comprometido con el desarrollo académico y personal de mis alumnos a través de métodos innovadores y un enfoque práctico.'
  };

  constructor() {}

  ngOnInit() {}

  editarPerfil() {
    console.log('Editar perfil...');
    // Aquí puedes abrir un modal o navegar a una página de edición
  }

  cambiarFoto() {
    console.log('Cambiar foto...');
    // Aquí puedes implementar la lógica para subir una nueva imagen
  }

  cerrarSesion() {
    console.log('Cerrando sesión...');
    // Implementar logout real según tu servicio de autenticación
  }
}
