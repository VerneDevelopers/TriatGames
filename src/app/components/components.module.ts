import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordleRowComponent } from './wordle-row/wordle-row.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { MiheaderComponent } from './miheader/miheader.component';
import { MimenuComponent } from './mimenu/mimenu.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentFormuComponent } from "./component-formu/component-formu.component";
import { ListaPuntosComponent } from './lista-puntos/lista-puntos.component';

@NgModule({
  declarations: [MiheaderComponent,MimenuComponent,ComponentFormuComponent,WordleRowComponent,ListaPuntosComponent],
  exports: [MimenuComponent,MiheaderComponent,ComponentFormuComponent,WordleRowComponent,ListaPuntosComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class ComponentsModule {}
