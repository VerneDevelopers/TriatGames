import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  listaDesordenada = [
    { name: 'Juan', puntuacion: 50 },
    { name: 'María', puntuacion: 30 },
    { name: 'Pedro', puntuacion: 70 },
    { name: 'Ana', puntuacion: 40 },
    { name: 'Luis', puntuacion: 60 },
    { name: 'Sofía', puntuacion: 55 },
    { name: 'Carlos', puntuacion: 25 },
    { name: 'Laura', puntuacion: 45 },
    { name: 'Diego', puntuacion: 80 },
    { name: 'Elena', puntuacion: 35 },
    { name: 'Javier', puntuacion: 65 },
    { name: 'Lucía', puntuacion: 20 },
    { name: 'Manuel', puntuacion: 75 },
    { name: 'Carmen', puntuacion: 42 },
    { name: 'Martín', puntuacion: 38 }
  ];
  constructor(private route: ActivatedRoute) { }

  ionViewWillEnter() {
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('juego');
      if (idParam !== null) {
        if (idParam == "") {
          this.juego="global";
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
  }

  activarM() {
    this.activeD = false;
    this.activeM = !this.activeM;
    this.activeA = false;
  }

  activarA() {
    this.activeD = false;
    this.activeM = false;
    this.activeA = !this.activeA;
  }
}
