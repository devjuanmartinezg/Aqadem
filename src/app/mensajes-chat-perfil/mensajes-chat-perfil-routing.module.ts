import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensajesChatPerfilPage } from './mensajes-chat-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: MensajesChatPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensajesChatPerfilPageRoutingModule {}
