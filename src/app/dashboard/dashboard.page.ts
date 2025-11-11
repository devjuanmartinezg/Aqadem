import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/data/dashboard.service';
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
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.dashboardService.obtenerDashboard().subscribe({
      next: (res: any) => {
        console.log('✅ Datos recibidos del dashboard:', res);

        if (res?.success) {
          this.clasesHoy = res.data?.eventos || [];
          this.apiStatus = '✅ API respondió correctamente';
          this.nombreProfesor = res.data?.nombreProfesor || 'Profesor';
        } else {
          this.clasesHoy = [];
          this.apiStatus = '⚠️ No se pudo cargar la información del dashboard.';
        }
      },
      error: (err: any) => {
        console.error('❌ Error cargando dashboard:', err);
        this.clasesHoy = [];
        this.apiStatus = `❌ Error del servidor: ${err.status || 'desconocido'}`;
      }
    });
  }


  verClase(nombreClase: string): void {
    this.router.navigate(['/clase-detalle', encodeURIComponent(nombreClase)]);
  }

  verTodasClases(): void {
    this.router.navigate(['/tabs/clases']);
  }

  verTodosMensajes(): void {
    this.router.navigate(['/tabs/mensajes']);
  }
}
