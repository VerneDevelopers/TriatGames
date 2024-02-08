import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fin-juego',
  templateUrl: './fin-juego.component.html',
  styleUrls: ['./fin-juego.component.scss'],
})
export class FinJuegoComponent implements OnInit {

  resultado: boolean = false;
  resultadoString: string = "";

  constructor(
    private modalController: ModalController
  ) { }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit(): void {
    if (this.resultado) {
      this.resultadoString = "HAS GANADO"
    } else {
      this.resultadoString = "HAS PERDIDO"
    }
  }
}
