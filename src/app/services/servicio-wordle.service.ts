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

    for (var i = 0; i < paD.length; i++) {

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

  /*palabrasDiaFire() : Observable<any[]> {
    const coleccion = collection(this.firestore, `palabrasWordle`);
    return collectionData(coleccion, {idField: 'id'})
    .pipe(
      map(palabras => palabras)
    );
  }*/
  palabrasDiaFire() : Observable<any[]> {
    const coleccion = collection(this.firestore, 'palabrasWordle');
    return collectionData(coleccion, { idField: 'id' });
  }
  
  async palabraDia(): Promise<string> {
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };
    var fecha = new Date();
    var fechaString : string = fecha.toLocaleString("es-ES", opcionesDeFormato);

    var palabra = ""

    const promesaPalabrasDia = new Promise<string>((resolve) => {
      this.palabrasDiaFire().subscribe(
        resp => {
          for (let i = 0; i < resp.length; i++) {
            if (resp[i] && fechaString === resp[i].fecha) {
              palabra = resp[i].palabra;
            }
          }
          resolve(palabra);
        }
      );
    });
  
    palabra = await promesaPalabrasDia;

    if (palabra == "") {
      palabra = "Hoy no hay palabra"
    }

    return palabra;
  }

  addJugada(userId:string, palabra:string, fecha: string) {
    const documentRef = doc(collection(this.firestore, `${userId}/Wordle/${fecha}`));

    const data = {
        palabra
    };

    return setDoc(documentRef, data);
}

  misJugadas(userId: string, fecha: string): Observable<any[]> {
    const document = collection(this.firestore, `${userId}/Wordle/${fecha}/`);
    return collectionData(document, { idField: 'id' })
      .pipe(
        map(palabras => palabras as any[])
      );
  }

}
