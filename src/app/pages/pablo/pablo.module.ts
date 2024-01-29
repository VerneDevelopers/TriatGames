import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PabloPageRoutingModule } from './pablo-routing.module';

import { PabloPage } from './pablo.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PabloPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PabloPage]
})
export class PabloPageModule {}
