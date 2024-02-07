import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { MiheaderComponent } from './miheader/miheader.component';
import { MimenuComponent } from './mimenu/mimenu.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentFormuComponent } from "./component-formu/component-formu.component";
import { FinJuegoComponent } from './fin-juego/fin-juego.component';



@NgModule({
  declarations: [MiheaderComponent,MimenuComponent,ComponentFormuComponent, FinJuegoComponent],
  exports: [MimenuComponent,MiheaderComponent,ComponentFormuComponent, FinJuegoComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ]


})
export class ComponentsModule {}
