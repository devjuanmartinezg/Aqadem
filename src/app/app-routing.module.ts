import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, type Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth-guard"; // Asegúrate de importar tu AuthGuard

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
    canActivateChild: [AuthGuard] // ✅ protege todas las rutas hijas de tabs
  },
  {
    path: 'clase-detalle/:id',
    loadChildren: () => import("./clase-detalle/clase-detalle.module").then((m) => m.ClaseDetallePageModule),
    canActivate: [AuthGuard] // ✅ opcional, protege ruta individual
  },
  {
    path: 'mensajes-chat/:id',
    loadChildren: () => import('./mensajes-chat/mensajes-chat.module').then(m => m.MensajesChatPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mensajes-chat-perfil/:id',
    loadChildren: () => import('./mensajes-chat-perfil/mensajes-chat-perfil.module').then(m => m.MensajesChatPerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alumno-detalle',
    loadChildren: () => import('./alumno-detalle/alumno-detalle.module').then( m => m.AlumnoDetallePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alumno-detalle/:id',
    loadChildren: () => import('./alumno-detalle/alumno-detalle.module').then( m => m.AlumnoDetallePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pasar-lista/:id',
    loadChildren: () => import('./pasar-lista/pasar-lista.module').then( m => m.PasarListaPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
