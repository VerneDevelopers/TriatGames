import { Component, Input, OnInit } from '@angular/core';
import { InterfacePuntos } from 'src/app/interfaces/interface-puntos';

@Component({
  selector: 'app-lista-puntos',
  templateUrl: './lista-puntos.component.html',
  styleUrls: ['./lista-puntos.component.scss'],
})
export class ListaPuntosComponent implements OnInit {
  @Input() listaEntrada: InterfacePuntos[] | undefined;
  listaVisible: InterfacePuntos[] = [];
  mostrarTodos = false;

  constructor() {}

  ngOnInit() {
    this.ordenarListaPorPuntos();
  }

    ordenarListaPorPuntos() {
    if (this.listaEntrada) {
      this.listaEntrada.sort((a, b) => b.puntuacion - a.puntuacion);
      this.listaVisible = this.listaEntrada.slice(0, 10);
    }
  }

  muestraTodos(){
    this.mostrarTodos = true;
    if(this.listaEntrada)
      this.listaVisible = this.listaEntrada;
  }
  
}
