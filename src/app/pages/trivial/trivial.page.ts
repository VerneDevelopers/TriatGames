import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { getAuth } from "@angular/fire/auth";
import { LoadingController, ModalController, ToastController } from "@ionic/angular";
import { PreguntaTrivial } from "src/app/interfaces/pregunta-trivial";
import { TiradaTrivial } from "src/app/interfaces/tirada-trivial";
import { TrivialService } from "src/app/services/trivial.service";


@Component({
  selector: "app-trivial",
  templateUrl: "./trivial.page.html",
  styleUrls: ["./trivial.page.scss"],
})
export class TrivialPage implements OnInit {
  tiradas: TiradaTrivial[] = [];
  preguntas: PreguntaTrivial[];
  pregunta: PreguntaTrivial = {} as PreguntaTrivial;
  respuestas: string[] = [
    "respuesta1",
    "respuesta2",
    "respuesta3",
    "respuesta4",
  ];
  indice=0;
  numeroIntentos = 0;
  preguntasContestadas = 0;
  respuestaUsuario = "";
  respuestaCorrecta = "";
  nAcertas = 0;
  preguntaAcertada = false;
  mensaje = "";
  colorCategoria = "";
  abrirModal = false;
  resultado = "ganado";
  uidUser = "";
  diaSemana = "1";
  formatoFecha: string = 'dd/MM/yyyy';

  constructor(
    private trivialSvc: TrivialService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private datePipe: DatePipe
  ) {
    this.preguntas = [];
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getIdUser();
    this.obtenerDia();
    this.obtenerPreguntas();
  }

  //Obtener el id del usuario autentificado
  getIdUser() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        this.uidUser = uid;
        console.log('user: ', this.uidUser)
        this.obtenerJugadas_v2();
        console.log('tiradas: ', this.preguntasContestadas)
      }
    });
  }


  /*------Chapucilla-------*/
  obtenerDia() {
    //Obtenemos la fecha actual
    const fechaActual = new Date();
    //Para obtener el dia y almacenarlo como un string
    this.diaSemana = fechaActual.getDay().toString();
    //console.log("Dia de la semana: " + this.diaSemana);
  }
  /************************/

  controlTiradas(){
    if(this.preguntasContestadas >= this.preguntas.length){
      this.abrirModal = true;
    }else{
      this.obtenerPregunta()
      
    }
  }

  obtenerPreguntas() {
    console.log('tiradas: ', this.preguntasContestadas)
    //Mostramos mensaje de espera al usuario mientras se recogen los datos de firebase
    this.showLoading();
    this.trivialSvc.getPreguntas(this.diaSemana).subscribe({
      next: (res: any) => {
        console.log(this.pregunta.indiceRespuesta);
        console.log(res);
        //Almacenamos las preguntas en el array preguntas
        this.preguntas = res;
        //Cerramos la espera
        this.loadingCtrl.dismiss();
        //Obtenemos las preguntas del array Preguntas
        //this.obtenerPregunta()
      },
      error: (error: any) => { },
    });
  }


  //Funcion para obtener la pregunta del array
  obtenerPregunta() {
    console.log(this.preguntas);
    //Utilizamos el numero de intentos para recorrer el array
    this.pregunta = this.preguntas[this.numeroIntentos];
    console.log('pregunta',this.pregunta);
    //Almacenamos las respuestas posibles
    this.respuestas = this.pregunta.respuestas;
    console.log('respuestas',this.respuestas);
    //Encontramos la respuesta correcta mediante el indice
    this.indice = this.pregunta.indiceRespuesta;
    console.log('indice: ',this.indice);
    //Almacenamos la respuesta correcta
    this.respuestaCorrecta = this.respuestas[this.indice];
    console.log('respuestaCorrecta',this.respuestaCorrecta);
    //Almacenamos la categoria
    this.asignarColor(this.pregunta.categoria)
    //console.log(this.colorCategoria);
    console.log(this.pregunta.indiceRespuesta);
  }


  //Comprobamos la respuesta del usuario
  responder(r: string) {
    this.numeroIntentos = this.numeroIntentos + 1;
    this.respuestaUsuario = r;
    console.log(
      "Has respondido con la opcion: " + r + " Intentos: " + this.numeroIntentos + " Opt Correcta: " + this.respuestaCorrecta
    );
    this.comprobarRespuesta();    
    //Deberiamos reiniciar el numero de intentos cuando termine la longitud del array de preguntas
    if (this.numeroIntentos > this.preguntas.length - 1) {
      //this.numeroIntentos = 0;
      this.abrirFinDelJuego();
    }
    this.obtenerPregunta();
  }


  //Se comprueba la respuesta del usuario
  comprobarRespuesta() {
    console.log(
      "respuestaUsuario: " +
      this.respuestaUsuario +
      " respuestaCorrecta: " +
      this.respuestaCorrecta
    );
    if (this.respuestaUsuario == this.respuestaCorrecta) {
      console.log("holita");
      this.mensaje = "Has acertadoo canalla!!";
      this.preguntaAcertada = true;
      this.nAcertas += 1;
      this.addTirada();
      this.mensajeToUser();
    } else if (typeof this.respuestaCorrecta === "undefined") {
      this.mensaje = "Suertee hoy bro!!!";
      this.mensajeToUser();
    } else {
      this.mensaje = `Mala suerte amigo, era ${this.respuestaCorrecta}`;
      console.log("no hay holita");
      this.preguntaAcertada = false;
      this.addTirada();
      this.mensajeToUser();
    }
  }


  //Cambiar el color segun la categoria
  asignarColor(categoria: string) {
    switch (categoria) {
      case "geografia":
        this.colorCategoria = 'warning'
        console.log(this.colorCategoria)
        break;
      case "ciencia":
        this.colorCategoria = 'success'
        console.log(this.colorCategoria)
        break;
      case "cine":
        this.colorCategoria = 'danger'
        console.log(this.colorCategoria)
        break;
      case "historia":
        this.colorCategoria = 'secondary'
        console.log(this.colorCategoria)
        break;
      default:
        this.colorCategoria = 'defaoultColor'
        console.log(this.colorCategoria)
        break;
    }
  }


  //Mensaje que se le muestra al usuario cuando indica una respuesta
  async mensajeToUser() {
    const toast = await this.toastController.create({
      message: this.mensaje,
      duration: 1500,
      position: "middle",
    });
    await toast.present();
  }


  //Funcion para mostrar la espera de la llamada de firebase
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: "Las preguntas de hoy son...",
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000); // Duración de dos segundos en milisegundos
  }


  //Utilizamos componente de oscar para mostrar al usuario el final de la partida
  abrirFinDelJuego() {
    this.numeroIntentos = 0;
    console.log('Respuestas acertadas: ');
    console.log(this.nAcertas)
    if (!this.abrirModal) {
      console.log(this.preguntas.length/2)
      if (this.nAcertas > this.preguntas.length/2) {
        this.abrirModal = true;
        this.resultado = "ganado";
      } else {
        this.abrirModal = true;
        this.resultado = "perdido";
      }
    } else {
      this.abrirModal = false;
    }
    console.log(this.abrirModal)
  }

  // Añadir jugada
  async addTirada() {
    console.log(this.preguntas)
    const tiradita: TiradaTrivial = {
      idJugador: this.uidUser,
      idPregunta: this.numeroIntentos,
      respuesta: this.respuestaUsuario,
      esCorrecta: this.preguntaAcertada
    };
    console.log(tiradita);
    const response = await this.trivialSvc.addTirada(tiradita)
    //console.log(response)
  }

  // async obtenerJugadas(){
  //   const fechaJugada = this.datePipe.transform(new Date(), this.formatoFecha)?.replace(/\//g, "")!;
  //   let uidNumber = parseInt(this.uidUser);
  //   console.log('hola jugadas: ')
  //   this.trivialSvc.getJugada(uidNumber, fechaJugada).subscribe((data) => {
  //     this.tiradas = data;
  //     console.log(this.tiradas);
      
  //   });

  // }

  obtenerJugadas_v2(){
    console.log(this.uidUser);
    let sub = this.trivialSvc.getCollectinData(this.uidUser).subscribe({
      next: (res: any) => {
        console.log('holaaaa:')
        console.log(res);
        this.tiradas = res;
        this.preguntasContestadas = this.tiradas.length;
        console.log('tiradas: ',this.preguntasContestadas);
        this.controlTiradas();
      },
      error: (error:any) =>{


      }
    });

  }
   
}

  //Falta verificar que la respuesta es correcta o incorrecta --> CHECK
  //Deberiamos reiniciar el numero de intentos cuando termine la longitud del array de preguntas --> CHECK
  //Mostrar un mensaje al usuario --> CHECK
  //Añadir color segun la categoria --> CHECK
  //Que hacer cuando se acierta y se falla --> CHECK
  //Cuando terminan las preguntas que se hace?  --> CHECK
  //Hacer un loading al empezar la pagina hasta que recargue las preguntas --> CHECK
  //Que pasa con los iconos?
  //Se muestra undefinded en alguna respues ¿por qué?
  //Añadir la respuesta a firebase --> CHECK
  //No es mejor añadir las respuestas totales en vez de una en una
  //Ale podemos guardar directamente el id de firebase
  //¿Qué guardamos en la tirada?






