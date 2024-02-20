import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrivialPageRoutingModule } from './trivial-routing.module';

import { TrivialPage } from './trivial.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrivialPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TrivialPage]
})
export class TrivialPageModule {}
