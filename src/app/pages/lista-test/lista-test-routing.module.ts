import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTestPage } from './lista-test.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaTestPageRoutingModule {}
