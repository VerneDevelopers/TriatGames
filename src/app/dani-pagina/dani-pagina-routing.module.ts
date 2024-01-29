import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaniPaginaPage } from './dani-pagina.page';

const routes: Routes = [
  {
    path: '',
    component: DaniPaginaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaniPaginaPageRoutingModule {}
