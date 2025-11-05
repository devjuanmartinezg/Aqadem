import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from "../services/data/data.service";

@Component({
  selector: 'app-pasar-lista',
  templateUrl: './pasar-lista.page.html',
  styleUrls: ['./pasar-lista.page.scss'],
  standalone: false,
})
export class PasarListaPage implements OnInit {

  claseCodigo: string = ''; // ahora texto, no número
  alumnosAsistencia: any[] = []; // array con alumnos + asistencia

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      const idParam = params.get('id');
      if (idParam) {
        this.claseCodigo = decodeURIComponent(idParam);
        console.log('Cargando asistencia para clase:', this.claseCodigo);
        this.cargarAlumnosParaAsistencia(this.claseCodigo);
      } else {
        console.warn('No se recibió ID de clase en la URL');
      }
    });
  }

  cargarAlumnosParaAsistencia(codigoClase: string) {
    this.dataService.getClaseDetalle(codigoClase).subscribe({
      next: (alumnos) => {
        console.log('Alumnos cargados:', alumnos);
        this.alumnosAsistencia = alumnos.map((a: any) => ({
          ...a,
          asistencia: 'P'
        }));
      },
      error: (err) => console.error('Error al cargar alumnos:', err)
    });
  }


  guardarAsistencia() {
    const listaGuardar = this.alumnosAsistencia.map(a => ({
      id: a.ID, // el campo real del JSON
      estado: a.asistencia
    }));

    console.log('📋 Asistencia guardada:', listaGuardar);
    // Aquí iría la lógica real de guardado (por ahora solo log)
    this.navCtrl.back();
  }

  goBack() {
    this.navCtrl.back();
  }
}
