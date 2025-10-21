import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'mensajes-chat/:id',
    loadChildren: () => import('./mensajes-chat/mensajes-chat.module').then(m => m.MensajesChatPageModule),
  },
  {
  path: 'mensajes-chat-perfil/:id',
  loadChildren: () => import('./mensajes-chat-perfil/mensajes-chat-perfil.module').then(m => m.MensajesChatPerfilPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
