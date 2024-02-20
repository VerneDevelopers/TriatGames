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

  entradaWordle = false;
  entradaAhorcado= false;
  entradaTrivial = false;
  entradaPuntuaciones = false;
  

  /* abrirFinDelJuego() {
    if (!this.abrirModal) {
      this.abrirModal = true;
    } else {
      this.abrirModal = false;
    }
    console.log(this.abrirModal)
  } */

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
