import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  abrirModal = false;
  resultado = "ganado";

  constructor() {}

  abrirFinDelJuego() {
    if (!this.abrirModal) {
      this.abrirModal = true;
    } else {
      this.abrirModal = false;
    }
    console.log(this.abrirModal)
  }
}
