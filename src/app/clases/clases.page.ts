import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-clases",
  templateUrl: "./clases.page.html",
  styleUrls: ["./clases.page.scss"],
  standalone:false,
})
export class ClasesPage {
  showSearch = false;
  searchText = "";
  filteredClases: any[] = [];

  clases = [
    { id: 1, nombre: "Matemáticas", horario: "Lunes 10:00", salon: "A1", alumnos: 20, icon: "calculator-outline" },
    { id: 2, nombre: "Historia", horario: "Martes 11:00", salon: "B2", alumnos: 15, icon: "book-outline" },
    { id: 3, nombre: "Física", horario: "Miércoles 12:00", salon: "C3", alumnos: 18, icon: "flask-outline" },
  ];

  constructor(private router: Router) {
    this.filteredClases = this.clases;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) this.onClear();
    console.log("Lupa clicada 🕵️‍♀️");
  }

  filterClases() {
    const text = this.searchText.toLowerCase();
    this.filteredClases = this.clases.filter((c) => c.nombre.toLowerCase().includes(text));
  }

  onClear() {
    this.searchText = "";
    this.filteredClases = this.clases;
  }

  getAvatarClass(icon: string) {
    switch (icon) {
      case "calculator-outline":
        return "bg-blue";
      case "book-outline":
        return "bg-green";
      case "flask-outline":
        return "bg-red";
      default:
        return "bg-default";
    }
  }

  verDetalles(clase: any) {
    this.router.navigate(["/clase-detalle", clase.id]);
  }
}
