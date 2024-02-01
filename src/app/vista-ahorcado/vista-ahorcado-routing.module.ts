import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaAhorcadoPage } from './vista-ahorcado.page';

const routes: Routes = [
  {
    path: '',
    component: VistaAhorcadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaAhorcadoPageRoutingModule {}
