import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasarListaPageRoutingModule } from './pasar-lista-routing.module';

import { PasarListaPage } from './pasar-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasarListaPageRoutingModule
  ],
  declarations: [PasarListaPage]
})
export class PasarListaPageModule {}
