import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.serv.scoreWorld().subscribe(
      resp => {
        for (const p of resp) {
          switch (this.juego) {
            case "global":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsTotales
              })
              break;
            case "Wordle":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsWordle
              })
              break;
            case "Ahorcado":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsAhorcado
              })
              break;
            case "Trivial":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsTrivial
              })
              break;
          }
        }
      }
    )
  }

  ngOnInit() {
    console.log("entra")
    this.route.paramMap.subscribe(params => {
      console.log("params:", params)
      const idParam = params.get('juego');
      console.log("idParam:", idParam)
      if (idParam !== null) {
        if (idParam == "") {
          this.juego = "global";
        } else {
          this.juego = idParam;
        }
      }else{
        this.juego = "global";
      }
    });

  }

  activarD() {
    this.listaPuntosFinal=[]
    this.activeD = !this.activeD;
    this.activeM = false;
    this.activeA = false;
    this.serv.scoreDay(new Date()).subscribe(
      resp => {
        for (const p of resp) {
          switch (this.juego) {
            case "global":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsTotales
              })
              break;
            case "Wordle":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsWordle
              })
              break;
            case "Ahorcado":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsAhorcado
              })
              break;
            case "Trivial":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsTrivial
              })
              break;
          }
        }
      }
    )
  }

  activarM() {
    this.listaPuntosFinal=[]
    this.activeD = false;
    this.activeM = !this.activeM;
    this.activeA = false;
    this.serv.scoreWeek(new Date()).subscribe(
      resp => {
        console.log("respuesta:",resp)
        for (const p of resp) {
          switch (this.juego) {
            case "global":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsTotales
              })
              break;
            case "Wordle":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsWordle
              })
              break;
            case "Ahorcado":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsAhorcado
              })
              break;
            case "Trivial":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsTrivial
              })
              break;
          }
        }
      }
    )


  }

  activarA() {
    this.listaPuntosFinal=[]
    this.activeD = false;
    this.activeM = false;
    this.activeA = !this.activeA;
    this.serv.scoreWorld().subscribe(
      resp => {
        console.log("respuesta:",resp)
        for (const p of resp) {
          switch (this.juego) {
            case "global":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsTotales
              })
              break;
            case "Wordle":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsWordle
              })
              break;
            case "Ahorcado":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsAhorcado
              })
              break;
            case "Trivial":
              this.listaPuntosFinal.push({
                "name": p.nombreUsuario,
                "puntuacion": p.ptsTrivial
              })
              break;
          }
        }
      }
    )
  }
}
