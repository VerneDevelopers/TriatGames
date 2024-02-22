import { Injectable } from '@angular/core';
import { Observable, range } from 'rxjs';
import { PreguntaTrivial } from '../interfaces/pregunta-trivial';
import { TiradaTrivial } from '../interfaces/tirada-trivial';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
// import { addDoc, collection, collectionData, getFirestore, query } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class TrivialService {


  formatoFecha: string = 'dd/MM/yyyy'

  constructor(private firestore: AngularFirestore, private datePipe: DatePipe) { }
 

  getPreguntas(dia:string): Observable<PreguntaTrivial[]> {
    return this.firestore.collection('trivialPreguntas').doc("bateriaPreguntas").collection<PreguntaTrivial>(dia).valueChanges();
  }
  
  //DatePipe sirve para dar formato a las fechas
  //FireBase no acepta barras inclinadas /
   addTirada(tirada: TiradaTrivial) :Promise<any> {
    console.log("tiradita;",tirada)
    //Formateo de fechas para que la fecha sea identificador de una serie de tiradas de un jugador en concreto
    const fechaJugada = this.datePipe.transform(new Date(), this.formatoFecha)?.replace(/\//g, "")!;
    const docJugador = this.firestore.collection('tiradas').doc(tirada.idJugador.toString());
    const fechaColeccionRef = docJugador.collection(fechaJugada);
    return fechaColeccionRef.add({
      idPregunta: tirada.idPregunta,
      respuesta: tirada.respuesta,
      esCorrecta: tirada.esCorrecta
    });
  }

  //Hay que plantearse que es lo que llegará, si un tipo date o un tipo string
  //Lo dejo provisionalmente en string
  getJugada(idJugador: string, fecha: string): Observable<TiradaTrivial[][]> {
    const documento = this.firestore.collection('tiradas').doc(idJugador);
    //console.log("getJugada", documento.collection<TiradaTrivial[]>(fecha.replace(/\//g, "")!).valueChanges());
    return documento.collection<TiradaTrivial[]>(fecha.replace(/\//g, "")!).valueChanges();
  }


  //  //==== OBTENER DOCUMENTOS DE UNA COLLECION ====
  //  getCollectinData(uidUser: string, collecstionQuery?:any){
  //   const fechaJugada = this.datePipe.transform(new Date(), this.formatoFecha)?.replace(/\//g, "")!;
  //   let path = `tiradas/${uidUser}/${fechaJugada}`;
  //   const ref = collection(getFirestore(),path);
  //   return collectionData(query(ref,collecstionQuery),{idField:'id'})
  // }

}


