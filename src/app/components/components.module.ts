import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PabloComponent } from './pablo/pablo.component';



@NgModule({
  declarations: [PabloComponent],
  exports: [PabloComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
