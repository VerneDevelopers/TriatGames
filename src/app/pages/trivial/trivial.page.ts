import { Component, OnInit } from '@angular/core';
import { PreguntaTrivial } from 'src/app/interfaces/pregunta-trivial';
import { TrivialService } from 'src/app/services/trivial.service';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.page.html',
  styleUrls: ['./trivial.page.scss'],
})
export class TrivialPage implements OnInit {

  preguntas:PreguntaTrivial[];
  pregunta:PreguntaTrivial= {} as PreguntaTrivial ;
  respuestas:string[] = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
  numeroIntentos:number=0;

  constructor(
    private trivialSvc: TrivialService, 
    ) {
      this.preguntas = [] ; 
     }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerPreguntas();
    console.log('LAS PREGUNTAS SON: ' + this.preguntas);
  }

  obtenerPreguntas(){
    this.trivialSvc.getPreguntas().subscribe({
      next: (res: any) => {
        console.log(res);
        this.preguntas = res;
        this.pregunta = this.preguntas[1]
        console.log(this.pregunta);
      },
      error: (error:any) =>{


      }

    })
  }

  responder(r:string){
    this.numeroIntentos = this.numeroIntentos + 1;
    console.log('Has respondido con la opcion: ' + r + ' Intentos: ' + this.numeroIntentos)
    
  }

}