import { Component } from "@angular/core"

@Component({
  selector: "app-clases",
  templateUrl: "./clases.page.html",
  styleUrls: ["./clases.page.scss"],
  standalone: false,
})
export class ClasesPage {
  showSearch = false
  searchText = ""
  filteredClases: any[] = []

  clases = [
    {
      nombre: "Matemáticas - 3°A",
      horario: "Lun/Mié 9-10h",
      salon: "Salón 203",
      alumnos: 32,
      icon: "calculator-outline",
    },
    {
      nombre: "Ciencias - 3°A",
      horario: "Mar/Jue 11-12h",
      salon: "Salón 101",
      alumnos: 25,
      icon: "flask-outline",
    },
    {
      nombre: "Historia - 2°B",
      horario: "Viernes 8-9:30h",
      salon: "Salón 305",
      alumnos: 28,
      icon: "book-outline",
    },
  ]

  constructor() {
    this.filteredClases = this.clases
  }

  toggleSearch() {
    this.showSearch = !this.showSearch
    if (!this.showSearch) this.onClear()
  }

  filterClases() {
    const text = this.searchText.toLowerCase()
    this.filteredClases = this.clases.filter((c) => c.nombre.toLowerCase().includes(text))
  }

  onClear() {
    this.searchText = ""
    this.filteredClases = this.clases
  }

  getAvatarClass(icon: string) {
    switch (icon) {
      case "calculator-outline":
        return "bg-blue"
      case "flask-outline":
        return "bg-green"
      case "book-outline":
        return "bg-orange"
      default:
        return "bg-default"
    }
  }
}

export default ClasesPage
