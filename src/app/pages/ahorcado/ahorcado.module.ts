import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AhorcadoPageRoutingModule } from './ahorcado-routing.module';

import { AhorcadoPage } from './ahorcado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AhorcadoPageRoutingModule
  ],
  declarations: [AhorcadoPage]
})
export class AhorcadoPageModule {}
