import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    var fecha = new Date();

    this.scoreServ.scoreDay(fecha).subscribe((puntuaciones) => {
      const jugador = puntuaciones.find(p => p.idUsuario == this.authServ.getUid());
      switch (this.juego) {
        case "Wordle":
            if (!jugador?.ptsWordle) {
              this.addScore(fecha);
            }
            break;
          case "Ahorcado":
            if (!jugador?.ptsAhorcado) {
              this.addScore(fecha);
            }
            break;
          case "Trivial":
            if (!jugador?.ptsTrivial) {
              this.addScore(fecha);
            }
            break;
          default:
            console.log("Juego desconocido");
            return;
      }
    })
  }

  addScore(fecha: Date) {
    this.authServ.getUserProfile().subscribe((user)=>{
      this.scoreServ.addPoints(user.id, user.name, fecha, this.juego, this.resultado)
    })
  }
}

