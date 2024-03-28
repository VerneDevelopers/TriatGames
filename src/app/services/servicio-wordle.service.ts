import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
//import { getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { Firestore, collectionData, collection, doc, updateDoc, setDoc, deleteDoc, docSnapshots } from '@angular/fire/firestore';
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

    for (var i = 0; i < paD.length; i++) {

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
      palabra = "mosca"
    }

    return palabra;
  }

  addJugada(userId: string, palabra: string) {
    const fecha = new Date();
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const fechaString: string = fecha.toLocaleString("es-ES", opcionesDeFormato);
  
    const documentRef = doc(
      collection(this.firestore, `Wordle/${userId}/${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`)
    );
  
    this.misJugadas(userId).pipe(
      take(1),
    ).subscribe({
      next: async (palabras: PalabraWordle[]) => {
        let orden: number;
  
        if (palabras.length === 0) {
          orden = 1;
        } else {
          orden = Math.max(...palabras.map(p => p.orden)) + 1;
        }
  
        const palabrita: PalabraWordle = {
          orden,
          fecha: fechaString,
          palabra,
          respuesta: await this.calcularRespuesta(palabra),
        };
  
        setDoc(documentRef, palabrita);
      }
    });
  }
  

  misJugadas(userId: string): Observable<PalabraWordle[]> {
    var fecha = new Date();
    const document = collection(
      this.firestore,
      `Wordle/${userId}/${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`
    );

    return collectionData(document, { idField: 'id' })
      .pipe(
        map(palabras => palabras as PalabraWordle[])
      );
  }

}