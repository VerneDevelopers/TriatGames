import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wordle-row',
  templateUrl: './wordle-row.component.html',
  styleUrls: ['./wordle-row.component.scss'],
})
export class WordleRowComponent  implements OnInit {
  @Input() palabra : string = '';
  @Input() aciertos : string = '';
  letras: string[] = ['','','','','']
  colores : string[] = ['','','','','']
  constructor() {
    
   }

  ngOnInit() {
    console.log("Palabra:", this.palabra)
    this.palabra= this.palabra.toUpperCase()
    if (this.palabra.length != 0){
      this.letras= this.palabra.split('');
    }
    if(this.aciertos.length != 0){
      this.colores = this.aciertos.split('');
    }
  }

}
