import { Component } from '@angular/core';
import { ServicioWordleService } from '../services/servicio-wordle.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /* abrirModal = false;
  resultado = "ganado"; */

  constructor() {}

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
}
