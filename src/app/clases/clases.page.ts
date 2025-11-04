import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../services/data/data.service";

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
  filteredClases: any[] = []; // ✅ esta propiedad debe existir
  loading = true;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.cargarGrupos();
  }

  cargarGrupos() {
    this.dataService.getClases().subscribe({
      next: (grupos) => {
        this.grupos = grupos;
        this.filteredClases = grupos.map((g) => ({
          id: g.Codigo,
          nombre: g.Nombre,
          horario: this.formatearHorarios(g.horarios),
          salon: g.horarios?.[0]?.NombreAula || "Aula sin asignar",
          alumnos: g.AlumnosGrupo || 0,
          icon: "book-outline",
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error("Error al cargar clases:", err);
        this.loading = false;
      },
    });
  }

  // 🔍 Buscador
  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) this.onClear();
  }

  filterClases() {
    const text = this.searchText.toLowerCase();
    this.filteredClases = this.grupos
      .map((g) => ({
        id: g.Codigo,
        nombre: g.Nombre,
        horario: this.formatearHorarios(g.horarios),
        salon: g.horarios?.[0]?.NombreAula || "Aula sin asignar",
        alumnos: g.AlumnosGrupo || 0,
        icon: "book-outline",
      }))
      .filter((c) => c.nombre.toLowerCase().includes(text));
  }

  onClear() {
    this.searchText = "";
    this.filteredClases = this.grupos.map((g) => ({
      id: g.Codigo,
      nombre: g.Nombre,
      horario: this.formatearHorarios(g.horarios),
      salon: g.horarios?.[0]?.NombreAula || "Aula sin asignar",
      alumnos: g.AlumnosGrupo || 0,
      icon: "book-outline",
    }));
  }

  // 🕒 Convierte horarios en texto legible
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

  // 🎨 Color del icono/avatar
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

  // 🚀 Navegar al detalle (usa índice del grupo)
  verDetalles(clase: any) {
  const id = clase.id || clase.nombre || clase.Codigo; // acepta cualquier formato
  if (id) {
    console.log('📘 Navegando a clase-detalle con ID/Codigo:', id);
    this.router.navigate(['/clase-detalle', encodeURIComponent(id)]);
  } else {
    console.warn('⚠️ Clase sin ID ni nombre:', clase);
  }
}

}
