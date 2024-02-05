import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrivialPageRoutingModule } from './trivial-routing.module';

import { TrivialPage } from './trivial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrivialPageRoutingModule
  ],
  declarations: [TrivialPage]
})
export class TrivialPageModule {}
