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
  preguntas: PreguntaTrivial[];
  pregunta: PreguntaTrivial = {} as PreguntaTrivial;
  respuestas: string[] = [
    "respuesta1",
    "respuesta2",
    "respuesta3",
    "respuesta4",
  ];
  numeroIntentos: number = 0;
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
  mes="1";
  anio="1";
  dia="1";

  constructor(
    private trivialSvc: TrivialService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
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
      }
    });
  }

  /*------Chapucilla-------*/
  obtenerDia() {
    //Obtenemos la fecha actual
    const fechaActual = new Date();
    //Para obtener el dia y almacenarlo como un string
    this.diaSemana = fechaActual.getDay().toString();
    this.dia = fechaActual.getDate().toString();
    this.mes = fechaActual.getMonth().toString();
    this.anio = fechaActual.getFullYear().toString();
    //console.log("Dia de la semana: " + this.diaSemana);
  }
  /************************/

  obtenerPreguntas() {
    //Mostramos mensaje de espera al usuario mientras se recogen los datos de firebase
    this.showLoading();
    this.trivialSvc.getPreguntas(this.diaSemana).subscribe({
      next: (res: any) => {
        console.log(res);
        //Almacenamos las preguntas en el array preguntas
        this.preguntas = res;
        //Cerramos la espera
        this.loadingCtrl.dismiss();
        //Almacenamos la repuesta correcta para luego comprobar si es correcta la respuesta del usuario
        this.respuestaCorrecta = this.respuestas[this.pregunta.indiceRespuesta];
        //Utilizamos el numero de intentos para recorrer el array
        this.pregunta = this.preguntas[this.numeroIntentos];
        console.log(this.pregunta);
        //Almacenamos las respuestas en el array respuestas
        this.respuestas = this.pregunta.respuestas;
        //console.log(this.pregunta.indiceRespuesta);
        //Comprobamos la respueta del usuario si es correcta
        this.comprobarRespuesta(this.respuestaCorrecta);
        //Almacenamos la categoria
        this.asignarColor(this.pregunta.categoria)
        //console.log(this.colorCategoria);
      },
      error: (error: any) => { },
    });
  }

  //Comprobamos la respuesta del usuario
  responder(r: string) {
    this.numeroIntentos = this.numeroIntentos + 1;
    this.respuestaUsuario = r;
    console.log(
      "Has respondido con la opcion: " + r + " Intentos: " + this.numeroIntentos
    );
    //Deberiamos reiniciar el numero de intentos cuando termine la longitud del array de preguntas
    //console.log("numPreguntas:",)
    if (this.numeroIntentos > this.preguntas.length - 1) {
      this.numeroIntentos = 0;
      this.abrirFinDelJuego();
    }
    //Volvemos a llamar la funcion obtenerPreguntas() para recargar las pregutnas
    this.obtenerPreguntas();
  }

  //Se comprueba la respuesta del usuario
  comprobarRespuesta(indiceRespuesta: string) {
    console.log(
      "respuestaUsuario: " +
      this.respuestaUsuario +
      " indiceRespuesta: " +
      indiceRespuesta
    );
    if (this.respuestaUsuario == indiceRespuesta) {
      console.log("holita");
      this.mensaje = "Has acertadoo canalla!!";
      this.preguntaAcertada = true;
      this.nAcertas += 1;
      this.addDocument();
      this.mensajeToUser();
    } else if (typeof indiceRespuesta === "undefined") {
      this.mensaje = "Suertee hoy bro!!!";
      this.mensajeToUser();
    } else {
      this.mensaje = `Mala suerte amigo, era ${indiceRespuesta}`;
      console.log("no hay holita");
      this.preguntaAcertada = false;
      this.addDocument();
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
    console.log('Respuestas acertadas: ');
    console.log(this.nAcertas)
    if (!this.abrirModal) {
      if (this.nAcertas >= 2) {

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
  async addDocument() {
    let path = `trivialPreguntas/users/${this.uidUser}/respuestas/${this.anio}/${this.mes}/${this.dia}`;
    const match: TiradaTrivial = {
      idJugador: this.uidUser,
      enunciado: this.pregunta.preguntaEnunciado,
      respuesta: this.respuestaUsuario,
      esCorrecta: this.preguntaAcertada
    };
    console.log(path);
    const response = await this.trivialSvc.addDocument(path, match)
    //console.log(response)
  }



  //Falta verificar que la respuesta es correcta o incorrecta --> CHECK
  //Deberiamos reiniciar el numero de intentos cuando termine la longitud del array de preguntas --> CHECK
  //Mostrar un mensaje al usuario --> CHECK
  //Añadir color segun la categoria --> CHECK
  //Que hacer cuando se acierta y se falla --> CHECK
  //Cuando terminan las preguntas que se hace?  --> CHECK
  //Hacer un loading al empezar la pagina hasta que recargue las preguntas --> CHECK
  //Añadir la respuesta a firebase --> CHECK
  //Que pasa con los iconos?
  //Se muestra undefinded en alguna respues ¿por qué?
  //No es mejor añadir las respuestas totales en vez de una en una 
  //Ale podemos guardar directamente el id de firebase
  //¿Qué guardamos en la tirada?
  //¿Qué puedo hacer para no poder volver a jugar?
  //Problemas con interface, vista, servicio, firebase estructura
}

