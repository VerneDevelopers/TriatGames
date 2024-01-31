import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManucasadoPageRoutingModule } from './manucasado-routing.module';

import { ManucasadoPage } from './manucasado.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManucasadoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ManucasadoPage]
})
export class ManucasadoPageModule {}
