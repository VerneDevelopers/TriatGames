import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Admin314Page } from './admin314.page';

const routes: Routes = [
  {
    path: '',
    component: Admin314Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Admin314PageRoutingModule {}
