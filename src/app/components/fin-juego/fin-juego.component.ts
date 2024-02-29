import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-fin-juego',
  templateUrl: './fin-juego.component.html',
  styleUrls: ['./fin-juego.component.scss'],
})
export class FinJuegoComponent implements OnInit {

  resultado: boolean = false;
  resultadoString: string = "";
  juego = ""

  constructor(
    private modalController: ModalController,
    private scoreServ: ScoreService,
    private authServ: AuthService
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
    this.addPuntos()
  }

  addPuntos() {
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };
    var fecha = new Date();

    this.authServ.getUserProfile().subscribe((user)=>{
      this.scoreServ.addPoints(user.id, user.name, fecha, this.juego, this.resultado)
    })
  }
}

