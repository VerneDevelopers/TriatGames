import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BernatPageRoutingModule } from './bernat-routing.module';

import { BernatPage } from './bernat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BernatPageRoutingModule
  ],
  declarations: [BernatPage]
})
export class BernatPageModule {}
