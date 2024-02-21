import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPuntuacion } from 'src/app/interfaces/i-puntuacion';
import { InterfacePuntos } from 'src/app/interfaces/interface-puntos';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-puntuaciones',
  templateUrl: './puntuaciones.page.html',
  styleUrls: ['./puntuaciones.page.scss'],
})
export class PuntuacionesPage implements OnInit {
  activeD: boolean = false;
  activeM: boolean = false;
  activeA: boolean = true;
  juego: string = "";
  listaPuntosFinal: InterfacePuntos[] = []

  constructor(private route: ActivatedRoute, private serv: ScoreService) { }

  ionViewWillEnter() {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('juego');
      if (idParam !== null) {
        if (idParam == "") {
          this.juego = "global";
        } else {
          this.juego = idParam;
        }
      }
    });

  }

  activarD() {
    this.activeD = !this.activeD;
    this.activeM = false;
    this.activeA = false;
    this.serv.scoreDay(new Date()).subscribe(
      resp => {
        for (const p of resp) {
          switch (this.juego) {
            case "global":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsTotales
              })
              break;
            case "Wordle":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsWordle
              })
              break;
            case "Ahorcado":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsAhorcado
              })
              break;
            case "Trivial":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsTrivial
              })
              break;
          }
        }
      }
    )
  }

  activarM() {
    this.activeD = false;
    this.activeM = !this.activeM;
    this.activeA = false;
    this.serv.scoreWeek(new Date()).subscribe(
      resp => {
        for (const p of resp) {
          switch (this.juego) {
            case "global":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsTotales
              })
              break;
            case "Wordle":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsWordle
              })
              break;
            case "Ahorcado":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsAhorcado
              })
              break;
            case "Trivial":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsTrivial
              })
              break;
          }
        }
      }
    )


  }

  activarA() {
    this.activeD = false;
    this.activeM = false;
    this.activeA = !this.activeA;
    this.serv.scoreWorld().subscribe(
      resp => {
        for (const p of resp) {
          switch (this.juego) {
            case "global":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsTotales
              })
              break;
            case "Wordle":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsWordle
              })
              break;
            case "Ahorcado":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsAhorcado
              })
              break;
            case "Trivial":
              this.listaPuntosFinal.push({
                "name": p.idUsuario,
                "puntuacion": p.ptsTrivial
              })
              break;
          }
        }
      }
    )
  }
}
