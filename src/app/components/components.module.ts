import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManuCasadoComponent } from './manu-casado/manu-casado.component';
import { WordleRowComponent } from './wordle-row/wordle-row.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ManuCasadoComponent, WordleRowComponent],
  exports: [ManuCasadoComponent, WordleRowComponent],
  imports: [
    CommonModule, IonicModule
  ]
})
export class ComponentsModule { }
