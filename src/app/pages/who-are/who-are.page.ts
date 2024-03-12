import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-who-are',
  templateUrl: './who-are.page.html',
  styleUrls: ['./who-are.page.scss'],
})
export class WhoArePage implements OnInit {

  items = [
    { nombre: 'Aaron Moreno Bulnes', imageUrl: '../../assets/imgMembers/aaron'+'.jpeg', urlGit: 'https://github.com/aaronmorenobulnes', ocupacion: 'Programador' },
    { nombre: 'Adrian Reina Bellido', imageUrl: '../../assets/imgMembers/adri'+'.jpeg', urlGit: 'https://github.com/AdrianReinaB', ocupacion: 'Programador' },
    { nombre: 'Manuel Alejandro Nunez Rodriguez', imageUrl: '../../assets/imgMembers/ale'+'.jpeg', urlGit: 'https://github.com/Alejandro18081990', ocupacion: 'Programador' },
    { nombre: 'Manuel Jesús Casado Gomez', imageUrl: '../../assets/imgMembers/manuel'+'.jpeg', urlGit: 'https://github.com/CasadoManuelJesus', ocupacion: 'Programador'},
    { nombre: 'Daniel Llamas Patxot', imageUrl: '../../assets/imgMembers/dani'+'.jpeg', urlGit: 'https://github.com/DaniiLlamas', ocupacion: 'Programador' },
    { nombre: 'Julian Garrido Quintero', imageUrl: '../../assets/imgMembers/julian'+'.jpeg', urlGit: 'https://github.com/Juliang325', ocupacion: 'Programador' },
    { nombre: 'Oscar Clavijo Lopez', imageUrl: '../../assets/imgMembers/oscar'+'.jpeg', urlGit: 'https://github.com/oscarcl03', ocupacion: 'Programador' },
    { nombre: 'Pablo Arenas Rodriguez', imageUrl: '../../assets/imgMembers/pablo'+'.jpeg', urlGit: 'https://github.com/parerod', ocupacion: 'Programador' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
