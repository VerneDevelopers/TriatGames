import { Component, OnInit } from '@angular/core';
import { PreguntaTrivial } from 'src/app/interfaces/pregunta-trivial';
import { TrivialService } from 'src/app/services/trivial.service';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.page.html',
  styleUrls: ['./trivial.page.scss'],
})
export class TrivialPage implements OnInit {

  preguntas: PreguntaTrivial[];
  pregunta: PreguntaTrivial = {} as PreguntaTrivial;
  respuestas: string[] = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
  numeroIntentos: number = 0;
  diaSemana = '1';
  respuestaUsuario = '';
  respuestaCorrecta = '';

  constructor(
    private trivialSvc: TrivialService,
  ) {
    this.preguntas = [];
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerDia();
    this.obtenerPreguntas();

  }

  obtenerPreguntas() {
    this.trivialSvc.getPreguntas(this.diaSemana).subscribe({
      next: (res: any) => {
        console.log(res);
        //Almacenamos las preguntas en el array preguntas
        this.preguntas = res;
        //Almacenamos la repuesta correcta para luego comprobar si es correcta la r del usuario
        this.respuestaCorrecta = this.respuestas[this.pregunta.indiceRespuesta]
        //Utilizamos el numero de intentos para recorrer el array
        this.pregunta = this.preguntas[this.numeroIntentos] /*-----------AQUI SE OBTIENE -------*/
        console.log(this.pregunta);
        //Almacenamos las respuestas en el array respuestas
        this.respuestas = this.pregunta.respuestas;
        console.log(this.pregunta.indiceRespuesta);
        //Comprobamos la respueta del usuario si es correcta
        this.comprobarRespuesta(this.respuestaCorrecta);
      },
      error: (error: any) => {
      }

    })
  }

  /*------Chapucilla-------*/
  obtenerDia() {
    //Obtenemos la fecha actual
    const fechaActual = new Date();
    //Para obtener el dia y almacenarlo como un string
    this.diaSemana = fechaActual.getDay().toString();
    console.log('Dia de la semana: ' + this.diaSemana)
  }
  /************************/

  responder(r: string) {
  
    this.numeroIntentos = this.numeroIntentos + 1;
    this.respuestaUsuario = r;
    console.log('Has respondido con la opcion: ' + r + ' Intentos: ' + this.numeroIntentos)
    //Deberiamos reiniciar el numero de intentos cuando termine la longitud del array de preguntas
    if (this.numeroIntentos > 1) {
      this.numeroIntentos = 0;
    }

    //Volvemos a llamar la funcion obtenerPreguntas() para recargar las pregutnas
    this.obtenerPreguntas()
    
  }

  comprobarRespuesta(indiceRespuesta:string){
    //Me pilla la respuesta anterior
    console.log('respuestaUsuario: ' + this.respuestaUsuario + ' indiceRespuesta: ' + indiceRespuesta)
      if (this.respuestaUsuario == indiceRespuesta){
        console.log('holita');
      }else{
        console.log('no hay holita')
      }
  }
  //Falta verificar que la respuesta es correcta o incorrecta check
  //Añadir la respuesta a firebase
  //Mostrar un mensaje al usuario
  //Añadir color segun la categoria   
  //Que hacer cuando se acierta y se falla
  //Cuando terminan las preguntas que se hace?
}
