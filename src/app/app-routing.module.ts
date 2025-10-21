import { NgModule } from "@angular/core"
import { PreloadAllModules, RouterModule, type Routes } from "@angular/router"

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "tabs",
    loadChildren: () => import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "clase-detalle",
    loadChildren: () => import("./clase-detalle/clase-detalle.module").then((m) => m.ClaseDetallePageModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
