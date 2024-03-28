import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-who-are',
  templateUrl: './who-are.page.html',
  styleUrls: ['./who-are.page.scss'],
})
export class WhoArePage implements OnInit {

  items = [
    { nombre: 'Aaron Moreno Bulnes', imageUrl: '../../assets/img/Members/aaron'+'.jpeg', urlGit: 'https://github.com/aaronmorenobulnes', ocupacion: 'Programador' },
    { nombre: 'Adrian Reina Bellido', imageUrl: '../../assets/img/Members/adri'+'.jpeg', urlGit: 'https://github.com/AdrianReinaB', ocupacion: 'Programador' },
    { nombre: 'Manuel Alejandro Nunez Rodriguez', imageUrl: '../../assets/img/Members/ale'+'.jpeg', urlGit: 'https://github.com/Alejandro18081990', ocupacion: 'Programador' },
    { nombre: 'Manuel Jesús Casado Gomez', imageUrl: '../../assets/img/Members/manuel'+'.jpeg', urlGit: 'https://github.com/CasadoManuelJesus', ocupacion: 'Programador'},
    { nombre: 'Daniel Llamas Patxot', imageUrl: '../../assets/img/Members/dani'+'.jpeg', urlGit: 'https://github.com/DaniiLlamas', ocupacion: 'Programador' },
    { nombre: 'Julian Garrido Quintero', imageUrl: '../../assets/img/Members/julian'+'.jpeg', urlGit: 'https://github.com/Juliang325', ocupacion: 'Programador' },
    { nombre: 'Oscar Clavijo Lopez', imageUrl: '../../assets/img/Members/oscar'+'.jpeg', urlGit: 'https://github.com/oscarcl03', ocupacion: 'Programador' },
    { nombre: 'Pablo Arenas Rodriguez', imageUrl: '../../assets/img/Members/pablo'+'.jpeg', urlGit: 'https://github.com/parerod', ocupacion: 'Programador' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
