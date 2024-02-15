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
        //Utilizamos el numero de intentos para recorrer el array
        this.pregunta = this.preguntas[this.numeroIntentos]
        console.log(this.pregunta);
        //Almacenamos las respuestas en el array respuestas
        this.respuestas = this.pregunta.respuestas;
        console.log(this.pregunta.indiceRespuesta);
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
    console.log('hola ' + this.diaSemana)
  }

  responder(r: string) {
    this.numeroIntentos = this.numeroIntentos + 1;
    console.log('Has respondido con la opcion: ' + r + ' Intentos: ' + this.numeroIntentos)
    //Deberiamos reiniciar el numero de intentos cuando termine la longitud del array de preguntas
    if (this.numeroIntentos > 1) {
      this.numeroIntentos = 0;
    }
    //Volvemos a llamar la funcion obtenerPreguntas() para recargar las pregutnas
    this.obtenerPreguntas()
  }
  //Falta verificar que la respuesta es correcta o incorrecta
  //Añadir la respuesta a firebase
  //Mostrar un mensaje al usuario
  //Añadir color segun la categoria   
}
