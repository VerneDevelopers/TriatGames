import { Component, OnInit } from '@angular/core';
import { PreguntaTrivial } from 'src/app/interfaces/pregunta-trivial';
import { TrivialService } from 'src/app/services/trivial.service';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.page.html',
  styleUrls: ['./trivial.page.scss'],
})
export class TrivialPage implements OnInit {

  preguntasRecibidas !: PreguntaTrivial[];
  

  constructor(private trivialService : TrivialService) {
    
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.trivialService.getPreguntas().subscribe(respuesta => {
      this.preguntasRecibidas = respuesta
    })
    
  }

}
