import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AhorcadoPageRoutingModule } from './ahorcado-routing.module';

import { AhorcadoPage } from './ahorcado.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AhorcadoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AhorcadoPage]
})
export class AhorcadoPageModule {}
