import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntuacionesPageRoutingModule } from './puntuaciones-routing.module';

import { PuntuacionesPage } from './puntuaciones.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntuacionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PuntuacionesPage]
})
export class PuntuacionesPageModule {}
