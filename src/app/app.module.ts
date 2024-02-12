import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { AngularFireModule } from '@angular/fire/compat';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), 
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    //Línea añadida por Ale. Es la única forma que he tenido para poder usar FireBase
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  //Aquí añado DatePipe para formatear fechas
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
