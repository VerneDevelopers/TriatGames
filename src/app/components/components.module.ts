import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManuCasadoComponent } from './manu-casado/manu-casado.component';



@NgModule({
  declarations: [ManuCasadoComponent],
  exports: [ManuCasadoComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
