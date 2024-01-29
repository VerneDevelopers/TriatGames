import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PabloPage } from './pablo.page';

const routes: Routes = [
  {
    path: '',
    component: PabloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PabloPageRoutingModule {}
