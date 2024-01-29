import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManucasadoPage } from './manucasado.page';

const routes: Routes = [
  {
    path: '',
    component: ManucasadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManucasadoPageRoutingModule {}
