import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManuCasadoComponent } from './manu-casado/manu-casado.component';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MiheaderComponent } from './miheader/miheader.component';
import { MimenuComponent } from './mimenu/mimenu.component';



@NgModule({
  declarations: [ManuCasadoComponent,MiheaderComponent,MimenuComponent],
  exports: [ManuCasadoComponent,MimenuComponent,MiheaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterLink
  ]
})
export class ComponentsModule { }
