import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/data/dashboard.service';
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
    this.cargarInfoProfesor();
  }

  /**
   * Carga los datos principales del dashboard (clases, mensajes, etc.)
   */
  cargarDatos(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data: any) => {
        console.log('✅ Datos recibidos del dashboard:', data);

        if (data?.data) {
          this.clasesHoy = data.data.eventos || [];
          this.mensajesPendientes = data.data.mensajes || [];
          this.apiStatus = '✅ API respondió correctamente (200)';
        } else {
          this.apiStatus = '⚠️ Respuesta vacía del servidor.';
        }
      },
      error: (err: any) => {
        console.error('❌ Error cargando datos del dashboard:', err);
        this.apiStatus = `❌ Error del servidor: ${err.status || 'desconocido'}`;
      },
    });
  }

  /**
   * Carga la información del profesor autenticado
   */
  cargarInfoProfesor(): void {
    this.dashboardService.getProfesorInfo().subscribe({
      next: (info: any) => {
        console.log('👨‍🏫 Info del profesor:', info);
        this.nombreProfesor = info?.nombre || 'Profesor';
      },
      error: (err: any) => {
        console.error('❌ Error cargando info profesor:', err);
      },
    });
  }

  /**
   * Navega al detalle de una clase
   */
  verClase(nombreClase: string): void {
    this.router.navigate(['/clase-detalle', encodeURIComponent(nombreClase)]);
  }

  /**
   * Navega a la lista completa de clases
   */
  verTodasClases(): void {
    this.router.navigate(['/tabs/clases']);
  }

  /**
   * Navega a la lista completa de mensajes
   */
  verTodosMensajes(): void {
    this.router.navigate(['/tabs/mensajes']);
  }
}
