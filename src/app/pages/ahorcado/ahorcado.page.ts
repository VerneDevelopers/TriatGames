import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Data } from '@angular/router';
import { ILetrasAhorcado } from 'src/app/interfaces/ILetrasAhorcado';
import { AhorcadoService } from 'src/app/services/ahorcado.service';




@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.page.html',
  styleUrls: ['./ahorcado.page.scss'],
})
export class AhorcadoPage implements OnInit {
  userUid: string
  fecha !: Date
  letrasJugadas: string[] = []
  //palabraDia !: any
  palabraDia = '';
  colores: string[] = [];
  coloresletras: string[] = [];

  palabraOculta = '';
  letra: string = ''
  vidas: number = 8
  ahorcadoImgs: string[] = [
    '0.png',
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png'
  ]
  ruta: string = "../../../assets/img/Ahorcado/"
  indiceImagen: number = 0;
  abrirModal = false;
  resultado = "ganado";
  constructor(private serv: AhorcadoService, private auth: Auth) {
    if (this.auth.currentUser?.uid != null)
      this.userUid = this.auth.currentUser?.uid.toString()
    else
      this.userUid = 'Error'




    this.fecha = new Date()
    console.log(this.userUid)
    //this.serv.getPalabraDia(this.fecha).subscribe( resp => { this.palabraDia = resp})
  }




  ngOnInit() {




    /*
    var fecha:Date=new Date()
    this.miServicio.getLetraporDia("userid",fecha).subscribe(
      (s) => {
        console.log(s)
      },
      (error) => console.error(error)
    );
    */
  }


  ionViewWillEnter() {
    this.serv.getPalabraDia(this.fecha).subscribe(resp => {
      if (resp != undefined && resp.length > 0) {
        this.palabraDia = resp[0]
        console.log("Palabra: ", this.palabraDia)
      } else {
        this.palabraDia = 'pandereta'
      }
      this.palabraOculta = '-'.repeat(this.palabraDia.length)




      this.serv.misJugadas(this.userUid).subscribe(resp => {
        this.letrasJugadas = []
        resp.forEach(element => {
          if (element.letra != '')
            this.letrasJugadas.push(element.letra)
        });
        console.log("MisJugadas:", resp)
        this.calcularPalabra();
      });
    });


  }





  calcularPalabra() {
    this.letrasJugadas.forEach(letra => {
      if (this.palabraDia.toLowerCase().includes(letra.toLowerCase())) {
        for (let i = 0; i < this.palabraDia.length; i++) {
          if (this.palabraDia[i].toLowerCase() === letra.toLowerCase()) {
            this.palabraOculta = this.palabraOculta.substring(0, i) + letra + this.palabraOculta.substring(i + 1);
          }
        }
      } else {
        this.indiceImagen++;
        if (this.indiceImagen >= this.ahorcadoImgs.length) {
          this.indiceImagen = 8;
        }
      }
    });

    this.palabraOculta.split("").forEach(letra => {
      if (letra == "-")
        this.colores.push("ahorcadoCol R");
      else
        this.colores.push("ahorcadoCol V");
    });


    this.letrasJugadas.forEach(letra => {
      if (this.palabraDia.toLowerCase().includes(letra.toLowerCase())) {
        this.coloresletras.push("ahorcadoCol V");
      } else {
        this.coloresletras.push("ahorcadoCol R");
      }
    });
    if (this.palabraDia.toLowerCase() === this.palabraOculta.toLowerCase()) {
      this.resultado = "ganado";
      this.abrirModal = true;
    }
  }


  addLetra() {
    this.serv.addJugada(this.userUid, this.letra.toUpperCase(), this.fecha).then(resp => {
      this.calcularPalabra()
    });

    this.letra = ""



  }






}






