import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable, catchError, filter, forkJoin, map, of } from 'rxjs';
import { IPuntuacion } from '../interfaces/i-puntuacion';

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
  addPoints(idUsuario: string, fecha: Date, idJuego: string, ganado: boolean) {
    const fechaHoy = this.datePipe.transform(fecha, this.formatoFecha)?.replace(/\//g, "")!;
    const idSemana = this.obtenerRangoDeSemana(fecha);
    const puntosGanados = ganado ? 3 : 1;

    const colecciones = [
      `puntuaciones/diaria/${fechaHoy}`,
      `puntuaciones/semanal/${idSemana}`,
      `puntuaciones/global/histórico`
    ];

    colecciones.forEach(coleccion => {
      const documentRef = this.afs.collection(coleccion).doc(idUsuario);

      documentRef.get().subscribe(snapshot => {
        const puntuacion: IPuntuacion = snapshot.data() as IPuntuacion || this.puntuacionVacia;


        switch (idJuego) {
          case "Wordle":
            puntuacion.ptsWordle = puntosGanados;
            break;
          case "Ahorcado":
            puntuacion.ptsAhorcado = puntosGanados;
            break;
          case "Trivial":
            puntuacion.ptsTrivial = puntosGanados;
            break;
          default:
            console.log("Juego desconocido");
            return;
        }
        puntuacion.idUsuario = idUsuario;
        puntuacion.ptsTotales += puntosGanados;

        this.afs.collection(coleccion).doc(idUsuario).set(puntuacion);
      });
    });
  }

  // ScoreDay(fecha) -> lista de usuarios y puntos de ese dia
  scoreDay(fecha: Date): Observable<IPuntuacion[]> {
    const fechaHoy = this.datePipe.transform(fecha, this.formatoFecha)?.replace(/\//g, "")!;
    return this.afs.collection<IPuntuacion>(`puntuaciones/diaria/${fechaHoy}`).valueChanges();
  }
  // ScoreWeek(fechaInicio) -> lista de esa semana
  scoreWeek(fecha: Date): Observable<IPuntuacion[]> {
    const idSemana = this.obtenerRangoDeSemana(fecha)
    return this.afs.collection<IPuntuacion>(`puntuaciones/semanal/${idSemana}`).valueChanges();
  }
  // ScoreWorld()-> lista total
  scoreWorld(): Observable<IPuntuacion[]> {
    return this.afs.collection<IPuntuacion>(`puntuaciones/global/histórico`).valueChanges();
  }

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
