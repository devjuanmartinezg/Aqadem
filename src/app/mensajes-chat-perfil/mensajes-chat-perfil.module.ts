import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensajesChatPerfilPageRoutingModule } from './mensajes-chat-perfil-routing.module';

import { MensajesChatPerfilPage } from './mensajes-chat-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensajesChatPerfilPageRoutingModule
  ],
  declarations: [MensajesChatPerfilPage]
})
export class MensajesChatPerfilPageModule {}
