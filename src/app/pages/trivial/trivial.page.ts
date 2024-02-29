import { AuthService } from './../../services/auth.service';
import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
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
  pregunta: PreguntaTrivial = {} as PreguntaTrivial;
  colorCategoria = "";
  abrirModal = false;
  resultado = "ganado";
  uid: string = "";

  constructor(
    private trivialSvc: TrivialService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private datePipe: DatePipe,
    private auth: AuthService
  ) {
    //  this.preguntas = [];
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.uid = this.auth.getUid()!;
    // console.log("uid",this.uid);
    this.cargardatos();


  }



  /*------Chapucilla-------*/
  obtenerDia(): string {
    //Obtenemos la fecha actual
    const fechaActual = new Date();
    //Para obtener el dia y almacenarlo como un string
    return fechaActual.getDay().toString();
  }
  /************************/



  cargardatos() {
    //    //console.log('tiradas: ', this.preguntasContestadas)
    //Mostramos mensaje de espera al usuario mientras se recogen los datos de firebase
    this.showLoading();
    this.trivialSvc.getPreguntas(this.obtenerDia()).subscribe({
      next: (res: any) => {

        //Almacenamos las preguntas en el array preguntas
        var preguntas = res;
        //Cerramos la espera
        this.loadingCtrl.dismiss();
        //Obtenemos las preguntas del array Preguntas
        this.obtenerJugadas(preguntas);
      },
      error: (error: any) => { },
    });
  }

  async obtenerJugadas(preguntas: PreguntaTrivial[]) {
    const fechaJugada = this.datePipe.transform(new Date(), 'dd/MM/yyyy')?.replace(/\//g, "")!;

    //let uidNumber = parseInt(this.uidUser);
    //console.log('hola jugadas: ')
    this.trivialSvc.getJugada(this.uid, fechaJugada).subscribe((data) => {
      console.log(data)
      this.tiradas = data;
      if (this.tiradas.length >= preguntas.length) {
        this.abrirFinDelJuego();
      } else {

        this.pregunta = preguntas[this.tiradas.length];
        this.asignarColor(this.pregunta.categoria)
      }

    });

  }


  //Comprobamos la respuesta del usuario
  responder(respuestaUsuario: string) {
    var numPregunta = this.tiradas.length
    var mensaje = ""
    var respuestaCorrecta = this.pregunta.respuestas[this.pregunta.indiceRespuesta];
    if (respuestaUsuario == respuestaCorrecta) {
      mensaje = "Has acertadoo canalla!!";
      this.addTirada(respuestaUsuario, numPregunta);
    } else if (typeof respuestaCorrecta === "undefined") {
      mensaje = "Suertee hoy bro!!!";
    } else {
      mensaje = `Mala suerte amigo, era ${respuestaCorrecta}`;

      this.addTirada(respuestaUsuario, numPregunta);
    }
    this.mensajeToUser(mensaje);


  }

  //Cambiar el color segun la categoria
  asignarColor(categoria: string) {
    switch (categoria) {
      case "geografia":
        this.colorCategoria = 'warning'
        break;
      case "ciencia":
        this.colorCategoria = 'success'
        break;
      case "cine":
        this.colorCategoria = 'danger'
        break;
      case "historia":
        this.colorCategoria = 'secondary'
        break;
      default:
        this.colorCategoria = 'defaoultColor'
        break;
    }
  }


  //Mensaje que se le muestra al usuario cuando indica una respuesta
  async mensajeToUser(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
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

    if (!this.abrirModal) {
//      console.log("tiradas" + this.tiradas)
      var nAcertas = 0;
      for(var i=0;i<this.tiradas.length;i++)
      {
        var t : TiradaTrivial =this.tiradas[i]
      //  console.log(t);
        if(t.esCorrecta)
          {nAcertas++;}
      }
  //    console.log("numAciertos",nAcertas)
     
      if (nAcertas > this.tiradas.length / 2) {
        this.abrirModal = true;
        this.resultado = "ganado";
      } else {
        this.abrirModal = true;
        this.resultado = "perdido";
      }
    } else {
      this.abrirModal = false;
    }
    //console.log(this.abrirModal)
  }





  // Añadir jugada
  async addTirada(respuesta: string, pregunta: number) {
    // console.log(this.preguntas)
    console.log("uid:", this.uid)

    var preguntaAcertada = respuesta == this.pregunta.respuestas[this.pregunta.indiceRespuesta];
    const tiradita: TiradaTrivial = {
      idJugador: this.uid,
      idPregunta: pregunta,
      respuesta: respuesta,
      esCorrecta: preguntaAcertada
    };
    console.log(tiradita);
    this.trivialSvc.addTirada(tiradita).then((s) => {
      console.log("response:", s)

    })
    ////console.log(response)
  }



}







