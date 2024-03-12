import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTestPageRoutingModule } from './lista-test-routing.module';

import { ListaTestPage } from './lista-test.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTestPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaTestPage]
})
export class ListaTestPageModule {}
