import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageAdriPageRoutingModule } from './page-adri-routing.module';

import { PageAdriPage } from './page-adri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageAdriPageRoutingModule
  ],
  declarations: [PageAdriPage]
})
export class PageAdriPageModule {}
