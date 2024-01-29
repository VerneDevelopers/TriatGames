import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaniPaginaPageRoutingModule } from './dani-pagina-routing.module';

import { DaniPaginaPage } from './dani-pagina.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaniPaginaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DaniPaginaPage]
})
export class DaniPaginaPageModule {}
