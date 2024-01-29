import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageAdriPage } from './page-adri.page';

const routes: Routes = [
  {
    path: '',
    component: PageAdriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageAdriPageRoutingModule {}
