import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasarListaPage } from './pasar-lista.page';

const routes: Routes = [
  {
    path: '',
    component: PasarListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasarListaPageRoutingModule {}
