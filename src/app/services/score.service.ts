import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private fire: AngularFirestore) {}


  getPuntuacion(): Observable<any> {
    return this.fire.collection('score').valueChanges();
  }


}
