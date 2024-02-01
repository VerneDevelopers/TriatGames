import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaAhorcadoPageRoutingModule } from './vista-ahorcado-routing.module';

import { VistaAhorcadoPage } from './vista-ahorcado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaAhorcadoPageRoutingModule
  ],
  declarations: [VistaAhorcadoPage]
})
export class VistaAhorcadoPageModule {}
