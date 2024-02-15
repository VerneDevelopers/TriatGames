import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puntuaciones',
  templateUrl: './puntuaciones.page.html',
  styleUrls: ['./puntuaciones.page.scss'],
})
export class PuntuacionesPage implements OnInit {
  activeD:boolean=false;
  activeM:boolean=false;
  activeA:boolean=false;
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
  constructor() {}

  ngOnInit() {
  }

  activarD(){
    this.activeD=!this.activeD;
    this.activeM=!this.activeM;
    this.activeA=!this.activeA;
  }

  activarM(){
    this.activeD=!this.activeD;
    this.activeM=!this.activeM;
    this.activeA=!this.activeA;
  }

  activarA(){
    this.activeD=!this.activeD;
    this.activeM=!this.activeM;
    this.activeA=!this.activeA;
  }
}
