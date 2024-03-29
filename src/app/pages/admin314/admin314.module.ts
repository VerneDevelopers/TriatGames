import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Admin314PageRoutingModule } from './admin314-routing.module';

import { Admin314Page } from './admin314.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Admin314PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Admin314Page]
})
export class Admin314PageModule {}
