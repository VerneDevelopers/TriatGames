import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BernatPage } from './bernat.page';

const routes: Routes = [
  {
    path: '',
    component: BernatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BernatPageRoutingModule {}
