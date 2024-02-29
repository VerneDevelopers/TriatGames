import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {
  constructor(private afs: AngularFirestore, private firestore: Firestore) { }

  async addJugada(userId: string, letra: string, fecha: Date): Promise<boolean> {
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };

    const data = { letra };

    const fechaFormato: string = fecha.toLocaleString("es-ES", opcionesDeFormato)
      .split('/').reverse().join('/');
    const documentRef = doc(collection(this.firestore, `${userId}/Ahorcado/${fechaFormato}`));

    //Comprobacion de que no este ya la letra, que no se ha jugado ya la letra que se pasa por parametro
    const docSnapshot = await getDoc(documentRef);
    if (docSnapshot.exists()) {
      const data2 = docSnapshot.data();
      if (data2 && data2 === data) {
        return false;
      }
    }

  
    await setDoc(documentRef, data);
    return true;
  }

  getLetraporDia(userId: string, fecha: Date): Observable<Data[]> {
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };

    const fechaFormato: string = fecha.toLocaleString("es-ES", opcionesDeFormato)
      .split('/').reverse().join('/');
    return this.afs.collection<Data>(`${userId}/Ahorcado/${fechaFormato}`).valueChanges();
  }

  getPalabraDia( fecha: Date): Observable<Data[]> {
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };

    const fechaFormato: string = fecha.toLocaleString("es-ES", opcionesDeFormato)
      .split('/').reverse().join('/');
    return this.afs.collection<Data>(`Ahorcado/palabra/${fechaFormato}`).valueChanges();
  }

}
