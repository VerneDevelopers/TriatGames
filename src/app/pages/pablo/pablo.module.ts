import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PabloPageRoutingModule } from './pablo-routing.module';

import { PabloPage } from './pablo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PabloPageRoutingModule
  ],
  declarations: [PabloPage]
})
export class PabloPageModule {}
