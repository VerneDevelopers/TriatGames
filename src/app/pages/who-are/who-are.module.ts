import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhoArePageRoutingModule } from './who-are-routing.module';

import { WhoArePage } from './who-are.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhoArePageRoutingModule,
    ComponentsModule
  ],
  declarations: [WhoArePage]
})
export class WhoArePageModule {}
