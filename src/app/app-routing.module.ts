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
    path: 'clase-detalle/:id',
    loadChildren: () => import("./clase-detalle/clase-detalle.module").then((m) => m.ClaseDetallePageModule),
  },
  {
    path: 'mensajes-chat/:id',
    loadChildren: () => import('./mensajes-chat/mensajes-chat.module').then(m => m.MensajesChatPageModule),
  },
  {
    path: 'mensajes-chat-perfil/:id',
    loadChildren: () => import('./mensajes-chat-perfil/mensajes-chat-perfil.module').then(m => m.MensajesChatPerfilPageModule)
  },
  {
    path: 'alumno-detalle',
    loadChildren: () => import('./alumno-detalle/alumno-detalle.module').then( m => m.AlumnoDetallePageModule)
  },
  {
    path: 'alumno-detalle/:id',
    loadChildren: () => import('./alumno-detalle/alumno-detalle.module').then( m => m.AlumnoDetallePageModule)
  },
  {
    path: 'pasar-lista/:id',
    loadChildren: () => import('./pasar-lista/pasar-lista.module').then( m => m.PasarListaPageModule)
  },


]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
