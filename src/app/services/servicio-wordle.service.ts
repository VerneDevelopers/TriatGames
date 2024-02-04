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


  addJugada(idUser: string, fecha: string, palabra: string): Promise<void> {

    const document = doc(collection(this.firestore, `${idUser}/${fecha}`));
    return setDoc(document, { palabra: palabra });

  }

  misJugadas(idUser: string, fecha: string) : Observable<any[]> {
    const document = collection(this.firestore, '${idUser}');
    return collectionData(document, {idField: 'id'})
    .pipe(
      map(palabras => palabras as any[])
    );
  }

}
