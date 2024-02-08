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
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
  };
  
  const fechaFormato: string = fecha.toLocaleString("en-EN", opcionesDeFormato);
    const documentRef = doc(collection(this.firestore, `${userId}/Ahorcado/${fechaFormato}/`));

    const data = {
        letra
    };

    return setDoc(documentRef, data);
}

}
