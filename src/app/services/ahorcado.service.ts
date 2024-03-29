import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Data } from '@angular/router';
import { ILetrasAhorcado } from '../interfaces/ILetrasAhorcado';
import { PalabraWordle } from '../interfaces/palabraWordle';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {
  private  opcionesDeFormato: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  };

  constructor(private afs: AngularFirestore, private firestore: Firestore) { }

  async addJugada(userId: string, letra: string, fecha: Date): Promise<boolean> {
    const data = { letra };
    const fechaFormato: string = fecha.toLocaleString("es-ES", this.opcionesDeFormato)
      .split('/').reverse().join('/');
    const documentRef = doc(collection(this.firestore, `Ahorcado/${fechaFormato}/${userId}`));

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

  getLetraporDia(userId: string, fecha: Date): Observable<any> {
   

    const fechaFormato: string = fecha.toLocaleString("es-ES", this.opcionesDeFormato)
      .split('/').reverse().join('/');
    return this.afs.collection<any>(`Ahorcado/${fechaFormato}/${userId}`).valueChanges();
  }


  misJugadas(userId: string): Observable<ILetrasAhorcado[]> {
    var fecha = new Date();

    const fechaFormato: string = fecha.toLocaleString("es-ES", this.opcionesDeFormato)
      .split('/').reverse().join('/');
    const document = collection(
      this.firestore,
      `Ahorcado/${fechaFormato}/${userId}`
      );
    return collectionData(document)
      .pipe(
        map(letra => letra as ILetrasAhorcado[])
      );

  }


  getPalabraDiaold( fecha: Date): Observable<string[]> {
   

    const fechaFormato: string = fecha.toLocaleString("es-ES", this.opcionesDeFormato)
      .split('/').reverse().join('/');
    return this.afs.collection<string>(`Ahorcado/palabra/${fechaFormato}`).valueChanges();
  }



  palabrasDiaFire(): Observable<PalabraWordle[]> {
    var fecha = new Date();

    const fechaFormato: string = fecha.toLocaleString("es-ES", this.opcionesDeFormato)
      .split('/').reverse().join('/');
    const coleccion = collection(this.firestore,  `Ahorcado/00000palabras/${fechaFormato}`);
    return collectionData(coleccion, { idField: 'id' })
      .pipe(
        map(palabras => palabras as PalabraWordle[])
      );
  }
  async palabraDia(): Promise<string> {

  
    var palabra = ""

    const promesaPalabrasDia = new Promise<string>((resolve) => {
      this.palabrasDiaFire().subscribe(
        resp => {
          for (let i = 0; i < resp.length; i++) {
           
              palabra = resp[i].palabra.trim();
            
          }
          resolve(palabra);
        }
      );
    });

    palabra = await promesaPalabrasDia;

    if (palabra == "") {
      palabra = "mariposa"
    }

    return palabra;
  }
  
  cargarPalabras(palabras: string[], fecha: Date) {

    for (let i = 0; i < palabras.length; i++) {
      //fecha dia es i dias despues de fecha
      const fechadia = new Date(fecha);

      fechadia.setDate(fechadia.getDate() + i);
      var fechaString: string = fechadia.toLocaleString("es-ES", this.opcionesDeFormato);

      const fechaFormato: string = fechadia.toLocaleString("es-ES", this.opcionesDeFormato)
        .split('/').reverse().join('/');
      const documentRef = doc(collection(this.firestore, `Ahorcado/00000palabras/${fechaFormato}`));
      var palabra = palabras[i];
      const data = {
        fecha: fechaString,
        palabra: palabras[i]

      };
      setDoc(documentRef, { palabra });
    }
  }
}
