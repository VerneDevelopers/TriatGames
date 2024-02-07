import { Component, OnInit, Input } from '@angular/core';
import { InterfacePuntos } from 'src/app/interfaces/interface-puntos';

@Component({
  selector: 'app-lista-puntos',
  templateUrl: './lista-puntos.component.html',
  styleUrls: ['./lista-puntos.component.scss'],
})
export class ListaPuntosComponent  implements OnInit {
  @Input() listaEntrada : InterfacePuntos | undefined;
  constructor() { }

  ngOnInit() {}

}
