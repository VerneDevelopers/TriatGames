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
  //fecha !: Date
  letrasJugadas: string[] = []
  //palabraDia !: any
  palabraDia = '';
  colores: string[] = [];
  coloresletras: string[] = [];
  palabraOculta = '';
  letra: string = ''
  indiceImagen: number = 0;
  abrirModal = false;
  resultado = "ganado";

  constructor(private serv: AhorcadoService, private auth: Auth) {
    if (this.auth.currentUser?.uid != null)
      this.userUid = this.auth.currentUser?.uid.toString()
    else
      this.userUid = 'Error'
  }
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.serv.palabraDia().then(resp => {
      this.palabraDia = resp
      this.palabraOculta = '-'.repeat(this.palabraDia.length)
      this.serv.misJugadas(this.userUid).subscribe(resp => {
        this.letrasJugadas = []
        resp.forEach(element => {
          if (element.letra != '')
            this.letrasJugadas.push(element.letra)
        });
        this.calcularPalabra();
      });
    });
  }
  calcularPalabra() {
    this.indiceImagen = 0;
    this.letrasJugadas.forEach(letra => {
      if (this.palabraDia.toLowerCase().includes(letra.toLowerCase())) {
        for (let i = 0; i < this.palabraDia.length; i++) {
          if (this.palabraDia[i].toLowerCase() === letra.toLowerCase()) {
            this.palabraOculta = this.palabraOculta.substring(0, i) + letra + this.palabraOculta.substring(i + 1);
          }
        }
      } else {
        this.indiceImagen++;
        if (this.indiceImagen >= 8) {
          this.indiceImagen = 8;
        }
      }
    });
    this.colores = [];
    this.palabraOculta.split("").forEach(letra => {
      if (letra == "-")
        this.colores.push("ahorcadoCol R");
      else
        this.colores.push("ahorcadoCol V");
    });

    this.coloresletras = [];
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

    if (this.indiceImagen >= 8) {
      this.resultado = "perdido";
      this.abrirModal = true;
    }
  }
  addLetra() {
    this.serv.addJugada(this.userUid, this.letra.toUpperCase(), new Date()).then(resp => {
      this.calcularPalabra()
    });
    this.letra = ""
  }






}






