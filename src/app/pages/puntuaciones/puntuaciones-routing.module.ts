import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntuacionesPage } from './puntuaciones.page';

const routes: Routes = [
  {
    path: '',
    component: PuntuacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntuacionesPageRoutingModule {}
