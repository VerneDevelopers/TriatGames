import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicioWordleService {

  constructor(private firestore: Firestore) { }

  calcularRespuesta(palabra: string, palabradeldia: string): string {
    palabra = palabra.toUpperCase()

    palabradeldia = palabradeldia.toUpperCase()

    var paD: string[] = []
    var paI: string[] = []

    paD = palabradeldia.split('')
    paI = palabra.split('')

    var respu = ""

    for (var i = 0; i <= paD.length; i++) {

      if (paD[i] == paI[i]) {
        respu += "V"
      }else if (paD.includes(paI[i])) {
        respu += "A"
      }else {
        respu += "G"
      }

    }

    return respu
  }

  palabraDiaFire() : Observable<any[]> {
    const coleccion = collection(this.firestore, `palabrasWordle`);
    return collectionData(coleccion, {idField: 'id'})
    .pipe(
      map(palabras => palabras)
    );
  }

  //Terminar palabraDia
  /*palabraDia() : string {
    var pas = this.palabraDiaFire().subscribe(
      s=>

      s.length
    )

    
    
    
    return ""
  }*/

  addJugada(idUser: string, fecha: string, palabra: string): Promise<void> {

    palabra = palabra.toUpperCase()

    

    const document = doc(collection(this.firestore, `${idUser}/${fecha}`));





    return setDoc(document, { palabra: palabra });

  }

  misJugadas(idUser: string, fecha: string): Observable<any[]> {
    const document = collection(this.firestore, `${idUser}`);
    return collectionData(document, { idField: 'id' })
      .pipe(
        map(palabras => palabras as any[])
      );
  }

}
