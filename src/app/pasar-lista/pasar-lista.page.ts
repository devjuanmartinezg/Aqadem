import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonicModule } from '@ionic/angular';
import { DataService } from "../services/data/data.service"; // Asegúrese de que la ruta sea correcta
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🌟 CRUCIAL para [(ngModel)]

@Component({
  selector: 'app-pasar-lista',
  templateUrl: './pasar-lista.page.html',
  styleUrls: ['./pasar-lista.page.scss'],
  standalone: false, // Asumimos que es un componente Standalone
})
export class PasarListaPage implements OnInit {
  
  claseId!: number;
  alumnosAsistencia: any[] = []; // Array para almacenar alumnos y su estado de asistencia

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      const idParam = params.get('id');
      if (idParam) {
        this.claseId = +idParam;
        this.cargarAlumnosParaAsistencia(this.claseId);
      }
    });
  }
  
  cargarAlumnosParaAsistencia(id: number) {
    // Reutiliza el método del servicio para obtener la lista de alumnos de la clase
    this.dataService.getClaseDetalle(id).subscribe({ 
      next: (claseData: any) => {
        if (claseData && claseData.alumnos) {
          // Mapea los alumnos para inicializar el estado de asistencia en 'P' (Presente)
          this.alumnosAsistencia = claseData.alumnos.map((a: any) => ({
            ...a,
            asistencia: 'P' // P: Presente, A: Ausente (No Asistió), J: Justificada
          }));
        }
      },
      error: (err: any) => {
          console.error("Error al cargar alumnos:", err);
      }
    });
  }

  guardarAsistencia() {
    // Prepara los datos a guardar (solo ID y Estado)
    const listaGuardar = this.alumnosAsistencia.map(a => ({
      id: a.id,
      estado: a.asistencia 
    }));

    console.log('Asistencia a guardar:', listaGuardar);
    // 🌟 LÓGICA DE PERSISTENCIA AQUÍ (Firestore/API)

    // Vuelve a la pantalla anterior
    this.navCtrl.back();
  }

  goBack() {
    this.navCtrl.back();
  }
}
