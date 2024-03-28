import { Component } from '@angular/core';
import { ScoreService } from '../../services/score.service';
import { IPuntuacion } from '../../interfaces/i-puntuacion';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /* abrirModal = false;
  resultado = "ganado"; */

  scores! : IPuntuacion[]

  constructor(private servi : ScoreService, private auth : Auth) {}

  entradaWordle = false;
  entradaAhorcado= false;
  entradaTrivial = false;
  entradaPuntuaciones = true;

  ngOnInit() {
    this.repasar()
  }
  

  repasar() {
    this.servi.scoreDay(new Date()).subscribe(
      resp => {
        this.scores = resp;
        
        console.log(this.scores)
        if(this.scores.length == 0) {
          this.entradaAhorcado  =  true;
          this.entradaTrivial  =  true;
          this.entradaWordle=  true;
        }
        for(var i = 0; i < this.scores.length;i++) {
          if(this.auth.currentUser?.uid == this.scores[i].idUsuario) {
            
            if(this.scores[i].ptsAhorcado == 0) {
              this.entradaAhorcado  =  true;
              console.log("ahorcado:",this.entradaAhorcado)
            }
            if(this.scores[i].ptsTrivial == 0) {
              this.entradaTrivial  =  true;
              console.log("trivial:",this.entradaTrivial)
            }
            if(this.scores[i].ptsWordle == 0) {
              this.entradaWordle=  true;
              console.log("wordle:",this.entradaWordle)
            }
          }
        }
        console.log("ahorcado:",this.entradaAhorcado)
        console.log("trivial:",this.entradaTrivial)
        console.log("wordle:",this.entradaWordle)
      }
    )
  }

  /* abrirFinDelJuego() {
    if (!this.abrirModal) {
      this.abrirModal = true;
    } else {
      this.abrirModal = false;
    }
    console.log(this.abrirModal)
  } */



    //Ejemplo de añadir puntos
    //------------------------------------------
    //¡¡SE DEBEN DE EJECUTAR 1 A 1 ALSER SUSCRIPCIONES!!
    //------------------------------------------
    // this.serv.addPoints("Manu", new Date(), "Wordle", true)
    // this.serv.addPoints("Manu", new Date(), "Ahorcado", false)
    // this.serv.addPoints("Manu", new Date(), "Trivial", true)
    // this.serv.addPoints("Bernat", new Date(), "Wordle", false)
    // this.serv.addPoints("Bernat", new Date(), "Ahorcado", true)
    // this.serv.addPoints("Bernat", new Date(), "Trivial", false)

    //Ejemplo de scoreDay
    //------------------------------------------
    // this.serv.scoreDay(new Date()).subscribe(
    //   resp => {
    //     console.log(resp)
    //   }
    // )

    //Ejemplo de scoreWeek
    //------------------------------------------
    // this.serv.scoreWeek(new Date()).subscribe(
    //   resp => {
    //     console.log(resp)
    //   }
    // )

    //Ejemplo de scoreWorld
    //------------------------------------------
    // this.serv.scoreWorld().subscribe(
    //   resp => {
    //     console.log(resp)
    //   }
    // )

  entradaWordleTrue() {
    this.entradaWordle = true;
  }

  entradaAhorcadoTrue() {
    this.entradaAhorcado = true;
  }

  entradaTrivialTrue() {
    this.entradaTrivial = true;
  }

  entradaPuntuacionesTrue() {
    this.entradaPuntuaciones = true;
  }

}
