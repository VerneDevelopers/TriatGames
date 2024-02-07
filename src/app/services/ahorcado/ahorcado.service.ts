import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, where, query, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {
  constructor(private afs: AngularFirestore, private firestore: Firestore) { }

  addJugada(userId:string, letra:string, fecha:Date) {
    const documentRef = doc(collection(this.firestore, `users/${userId}/Ahorcado`));

    const data = {
        letra,
        fecha
    };

    return setDoc(documentRef, data);
}

}
