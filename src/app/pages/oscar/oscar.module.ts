import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OscarPageRoutingModule } from './oscar-routing.module';

import { OscarPage } from './oscar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OscarPageRoutingModule
  ],
  declarations: [OscarPage]
})
export class OscarPageModule {}
