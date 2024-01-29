import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OscarPage } from './oscar.page';

const routes: Routes = [
  {
    path: '',
    component: OscarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OscarPageRoutingModule {}
