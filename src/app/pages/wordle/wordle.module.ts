import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordlePageRoutingModule } from './wordle-routing.module';

import { WordlePage } from './wordle.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordlePageRoutingModule,
    ComponentsModule
  ],
  declarations: [WordlePage]
})
export class WordlePageModule {}
