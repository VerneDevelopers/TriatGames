import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable, catchError, filter, forkJoin, map, of } from 'rxjs';
import { IPuntuacion } from '../interfaces/i-puntuacion';
import { IPuntuaciones } from '../interfaces/i-puntuaciones';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  formatoFecha: string = 'dd/MM/yyyy'
  puntuacionVacia!: IPuntuacion
  constructor(private afs: AngularFirestore, private datePipe: DatePipe) {
    this.puntuacionVacia = {
      "idUsuario": '',
      "ptsWordle": 0,
      "ptsAhorcado": 0,
      "ptsTrivial": 0,
      "ptsTotales": 0
    }
  }


  //addPoints(idusuario,fecha,idJuego,ganador/perdedor)
  addPoints(idUsuario: string, fecha: Date, idJuego: string, ganado: Boolean) {
    const fechaHoy = this.datePipe.transform(fecha, this.formatoFecha)?.replace(/\//g, "")!;
    const idSemana = this.obtenerRangoDeSemana(fecha)
    let puntosGanados: number = 0
    if (ganado) {
      puntosGanados = 3
    } else {
      puntosGanados = 1
    }
    const colecciones = [
      this.afs.collection(`puntuaciones/diaria/${fechaHoy}`),
      this.afs.collection(`puntuaciones/semanal/${idSemana}`),
      this.afs.collection(`puntuaciones/global/histórico`)
    ];

    let puntuacionDiaria: IPuntuacion = this.puntuacionVacia
    let puntuacionSemanal: IPuntuacion = this.puntuacionVacia
    let puntuacionGlobal: IPuntuacion = this.puntuacionVacia

    this.getPointDiaUser(fecha, idUsuario).subscribe(resp1 => {
      puntuacionDiaria = resp1;
      console.log("resp1", resp1)
      this.getPointSemUser(idSemana, idUsuario).subscribe(resp2 => {
        puntuacionSemanal = resp2
        this.getPointGlobUser(idUsuario).subscribe(resp3 => {
          puntuacionGlobal = resp3
          const puntuaciones = [puntuacionDiaria, puntuacionSemanal, puntuacionGlobal]
          console.log("puntuaciones", puntuaciones)
          // colecciones.forEach((it, ind) => {
          //     let puntuacion = puntuaciones[ind]
          // switch (idJuego) {
          //   case "Wordle":
          //     puntuacion.ptsWordle = puntosGanados;
          //     break;
          //   case "Ahorcado":
          //     puntuacion.ptsAhorcado = puntosGanados;
          //     break;
          //   case "Trivial":
          //     puntuacion.ptsTrivial = puntosGanados;
          //     break;
          //   default:
          //     console.log("Número desconocido");
          // }
          //   puntuacion.ptsTotales += puntosGanados;
          // it.doc(idUsuario).set(this.puntuacionVacia);
          // })
        })
      })
    })
  }

  // ScoreDay(fecha) -> lista de usuarios y puntos de ese dia
  scoreDay(fecha: Date):Observable<IPuntuacion[]>{
    const fechaHoy = this.datePipe.transform(fecha, this.formatoFecha)?.replace(/\//g, "")!;
    return this.afs.collection<IPuntuacion>(`puntuaciones/diaria/${fechaHoy}`).valueChanges();
  }
  // ScoreWeek(fechaInicio) -> lista de esa semana
  scoreWeek(fecha : Date):Observable<IPuntuacion[]>{
    const idSemana = this.obtenerRangoDeSemana(fecha)
    return this.afs.collection<IPuntuacion>(`puntuaciones/semanal/${idSemana}`).valueChanges();
  }
  // ScoreWorld()-> lista total
  scoreWorld():Observable<IPuntuacion[]>{
    return this.afs.collection<IPuntuacion>(`puntuaciones/global/histórico`).valueChanges();
  }

  getPointDiaUser(fecha: Date, idUsuario: string): Observable<IPuntuacion> {
    const fechaHoy = this.datePipe.transform(fecha, this.formatoFecha)?.replace(/\//g, "")!;
    const documentRef = this.afs.collection(`puntuaciones/diaria/${fechaHoy}`).doc<IPuntuacion>(idUsuario);

    return documentRef.valueChanges().pipe(
      map(doc => {
        if (doc) {
          return doc;
        } else {
          let puntuacion = this.puntuacionVacia
          puntuacion.idUsuario = idUsuario
          return puntuacion
        }
      }
      )
    )
  };

  getPointSemUser(idSemana: string, idUsuario: string): Observable<IPuntuacion> {
    const documentRef = this.afs.collection(`puntuaciones/semanal/${idSemana}`).doc<IPuntuacion>(idUsuario);

    return documentRef.valueChanges().pipe(
      map(doc => {
        if (doc) {
          return doc;
        } else {
          let puntuacion = this.puntuacionVacia
          puntuacion.idUsuario = idUsuario
          return puntuacion
        }
      }
      )
    )
  };

  getPointGlobUser(idUsuario: string): Observable<IPuntuacion> {
    const documentRef = this.afs.collection(`puntuaciones/global/histórico`).doc<IPuntuacion>(idUsuario);

    return documentRef.valueChanges().pipe(
      map(doc => {
        if (doc) {
          return doc;
        } else {
          let puntuacion = this.puntuacionVacia
          puntuacion.idUsuario = idUsuario
          return puntuacion
        }
      }
      )
    )
  };

  //Funcion para obtener el id de la coleccion para los puntos semanales
  obtenerRangoDeSemana(fecha: Date): string {
    const inicioSemana = new Date(fecha);
    inicioSemana.setDate(fecha.getDate() - fecha.getDay() + (fecha.getDay() === 0 ? -6 : 1));
    inicioSemana.setHours(0, 0, 0, 0);

    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6);
    finSemana.setHours(0, 0, 0, 0);

    const formatoInicio = `${inicioSemana.getDate()}${inicioSemana.getMonth() + 1}${inicioSemana.getFullYear()}`;
    const formatoFin = `${finSemana.getDate()}${finSemana.getMonth() + 1}${finSemana.getFullYear()}`;

    return `${formatoInicio}_${formatoFin}`;
  }
}
