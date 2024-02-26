import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots } from '@angular/fire/firestore';
import { PalabraWordle } from '../interfaces/palabraWordle';

@Injectable({
  providedIn: 'root'
})
export class ServicioWordleService {

  constructor(private firestore: Firestore) { }

  async calcularRespuesta(palabra: string): Promise<string> {
    palabra = palabra.toUpperCase()

    const palabraDelDia = await this.palabraDia();
    const palabradeldia = palabraDelDia.toUpperCase();


    var paD: string[] = []
    var paI: string[] = []

    paD = palabradeldia.split('')
    paI = palabra.split('')

    var respu = ""

    for (var i = 0; i <= paD.length; i++) {

      if (paD[i] == paI[i]) {
        respu += "V"
      } else if (paD.includes(paI[i])) {
        respu += "A"
      } else {
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
  palabrasDiaFire(): Observable<PalabraWordle[]> {
    const coleccion = collection(this.firestore, 'palabrasWordle');
    return collectionData(coleccion, { idField: 'id' })
      .pipe(
        map(palabras => palabras as PalabraWordle[])
      );
  }

  async palabraDia(): Promise<string> {
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };
    var fecha = new Date();
    var fechaString: string = fecha.toLocaleString("es-ES", opcionesDeFormato);

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

  addJugada(userId: string, palabra: string) {
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };
    var fecha = new Date();
    var fechaString: string = fecha.toLocaleString("es-ES", opcionesDeFormato);

    const documentRef = doc(collection(this.firestore, `Wordle/${userId}/${fechaString}`));

    var jugadas

    this.misJugadas(userId, fechaString).subscribe(
      async resp => {
        jugadas = resp

        if (!jugadas) {
          const palabrita: PalabraWordle = {
            fecha: fechaString,
            palabra: palabra,
            respuesta: await this.calcularRespuesta(palabra)
          }

          const palabraVacia: PalabraWordle = {
            fecha: fechaString,
            palabra: '',
            respuesta: ''
          }
          jugadas = [palabrita, palabraVacia, palabraVacia, palabraVacia, palabraVacia, palabraVacia]
        } else {
          jugadas.forEach(async j => {
            if (j.palabra == "") {
              j.palabra = palabra;
              j.respuesta = await this.calcularRespuesta(palabra)
            }
          });
        }
        return setDoc(documentRef, jugadas);

      }
    );
  }

  misJugadas(userId: string, fecha: string): Observable<PalabraWordle[]> {
    const document = collection(this.firestore, `Wordle/${userId}/${fecha}`);
    return collectionData(document, { idField: 'id' })
      .pipe(
        map(palabras => palabras as PalabraWordle[])
      );
  }

}