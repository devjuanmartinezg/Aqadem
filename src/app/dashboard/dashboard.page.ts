import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/data/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  clasesHoy: any[] = [];
  mensajesPendientes: any[] = [];
  nombreProfesor: string = 'Profesor';
  apiStatus: string = '';

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    const token = this.authService.obtenerToken();
    if (!token) {
      this.apiStatus = '⚠️ No hay token guardado. Inicia sesión primero.';
      return;
    }

    this.dashboardService.getDashboardData(token).subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos del dashboard:', data);

        if (data?.data) {
          this.clasesHoy = data.data.eventos || [];
          this.apiStatus = '✅ API respondió correctamente (200)';
        } else {
          this.apiStatus = '⚠️ Respuesta vacía del servidor.';
        }
      },
      error: (err) => {
        console.error('❌ Error cargando datos del dashboard:', err);
        this.apiStatus = `❌ Error del servidor: ${err.status || 'desconocido'}`;
      },
    });
  }


  verClase(nombreClase: string) {
    this.router.navigate(['/clase-detalle', encodeURIComponent(nombreClase)]);
  }

  verTodasClases() {
    this.router.navigate(['/tabs/clases']);
  }

  verTodosMensajes() {
    this.router.navigate(['/tabs/mensajes']);
  }
}
