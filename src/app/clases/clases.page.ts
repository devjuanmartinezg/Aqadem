import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClasesService } from "../services/data/clases.service";

@Component({
  selector: "app-clases",
  templateUrl: "./clases.page.html",
  styleUrls: ["./clases.page.scss"],
  standalone: false,
})
export class ClasesPage implements OnInit {

  showSearch = false;
  searchText = "";

  grupos: any[] = [];
  filteredClases: any[] = [];
  loading = true;
  apiStatus: string = "";

  constructor(
    private router: Router,
    private clasesService: ClasesService
  ) {}

  ngOnInit() {
    this.cargarGrupos();
  }

  cargarGrupos() {
    this.clasesService.obtenerGrupos().subscribe({
      next: (grupos) => {
        console.log("📡 Grupos recibidos:", grupos);

        this.grupos = grupos;

        if (grupos.length) {
          this.apiStatus = "✅ API respondió correctamente";
        } else {
          this.apiStatus = "⚠️ No hay grupos disponibles";
        }

        this.filteredClases = grupos.map((g) => ({
          id: g.Codigo || g.codigo || g.ID,
          nombre: g.Nombre || g.nombre,
          horario: this.formatearHorarios(g.horarios),
          salon: g.horarios?.[0]?.NombreAula || "Aula sin asignar",
          alumnos: g.AlumnosGrupo || g.totalAlumnos || 0,
          icon: "book-outline",
        }));

        this.loading = false;
      },

      error: (err) => {
        console.error("❌ Error al cargar grupos:", err);
        this.loading = false;
        this.apiStatus = `❌ Error del servidor: ${err.status || "desconocido"}`;
      },
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) this.onClear();
  }

  filterClases() {
    const text = this.searchText.toLowerCase();
    this.filteredClases = this.grupos
      .map((g) => ({
        id: g.Codigo || g.codigo || g.ID,
        nombre: g.Nombre || g.nombre,
        horario: this.formatearHorarios(g.horarios),
        salon: g.horarios?.[0]?.NombreAula || "Aula sin asignar",
        alumnos: g.AlumnosGrupo || g.totalAlumnos || 0,
        icon: "book-outline",
      }))
      .filter((c) => c.nombre.toLowerCase().includes(text));
  }

  onClear() {
    this.searchText = "";
    this.filteredClases = this.grupos.map((g) => ({
      id: g.Codigo || g.codigo || g.ID,
      nombre: g.Nombre || g.nombre,
      horario: this.formatearHorarios(g.horarios),
      salon: g.horarios?.[0]?.NombreAula || "Aula sin asignar",
      alumnos: g.AlumnosGrupo || g.totalAlumnos || 0,
      icon: "book-outline",
    }));
  }

  formatearHorarios(horarios: any[]): string {
    if (!horarios || horarios.length === 0) return "Sin horario";
    return horarios
      .map(
        (h) =>
          `${this.diaSemana(h.DiaSemana)} ${h.HoraInicio?.slice(0, 5) || ""}`
      )
      .join(", ");
  }

  diaSemana(num: string): string {
    const dias = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    const index = parseInt(num, 10) - 1;
    return dias[index] || "";
  }

  getAvatarClass(icon: string) {
    switch (icon) {
      case "calculator-outline":
        return "bg-blue";
      case "book-outline":
        return "bg-green";
      case "flask-outline":
        return "bg-orange";
      default:
        return "bg-default";
    }
  }

  verDetalles(clase: any) {
    const id = clase.id || clase.nombre || clase.Codigo;
    if (id) {
      this.router.navigate(['/clase-detalle', encodeURIComponent(id)]);
    }
  }
}
