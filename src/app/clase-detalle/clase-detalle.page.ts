import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { NavController } from "@ionic/angular"

@Component({
  selector: "app-clase-detalle",
  templateUrl: "./clase-detalle.page.html",
  styleUrls: ["./clase-detalle.page.scss"],
  standalone: false,
})
export default class ClaseDetallePage implements OnInit {
  claseNombre = "Biología y Geología - 3º B"
  selectedTab = "temario"

  unidades = [
    {
      numero: 1,
      titulo: "La Célula",
      estado: "Completado",
      estadoColor: "success",
      icon: "checkmark-circle",
      iconColor: "success",
      examen: "25 de Octubre",
    },
    {
      numero: 2,
      titulo: "Genética Mendeliana",
      estado: "En progreso",
      estadoColor: "warning",
      icon: "hourglass",
      iconColor: "warning",
      examen: "15 de Noviembre",
    },
    {
      numero: 3,
      titulo: "Ecosistemas",
      estado: "Pendiente",
      estadoColor: "medium",
      icon: "time",
      iconColor: "medium",
      examen: "10 de Diciembre",
    },
  ]

  alumnos = [
    { nombre: "Juan Pérez", email: "juan@example.com", avatar: "JP" },
    { nombre: "María García", email: "maria@example.com", avatar: "MG" },
    { nombre: "Carlos López", email: "carlos@example.com", avatar: "CL" },
  ]

  historial = [
    { fecha: "15 de Enero", accion: "Clase creada", usuario: "Prof. Martínez" },
    { fecha: "20 de Enero", accion: "Unidad 1 completada", usuario: "Sistema" },
    { fecha: "5 de Febrero", accion: "Examen programado", usuario: "Prof. Martínez" },
  ]

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    // Get class name from route params if passed
    const nombre = this.route.snapshot.queryParamMap.get("nombre")
    if (nombre) {
      this.claseNombre = nombre
    }
  }

  goBack() {
    this.navCtrl.back()
  }

  segmentChanged(event: any) {
    this.selectedTab = event.detail.value
  }

  openUnidad(unidad: any) {
    console.log("Abrir unidad:", unidad)
    // Navigate to unit detail page
  }

  openListaAlumnos() {
    console.log("Abrir lista de alumnos")
    // Navigate to students list page
  }

  openTomaAsistencia() {
    console.log("Abrir toma de asistencia")
    // Navigate to attendance page
  }

  openCalificaciones() {
    console.log("Abrir calificaciones")
    // Navigate to grades page
  }

  openAnotaciones() {
    console.log("Abrir anotaciones")
    // Navigate to notes page
  }

  openFilter() {
    console.log("Abrir filtros de historial")
    // Open filter modal or sheet
  }

  addNewItem() {
    console.log("Agregar nuevo item en tab:", this.selectedTab)
    // Open modal or navigate to add page based on selected tab
  }

  

}
