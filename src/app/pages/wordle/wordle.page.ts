import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PalabraWordle } from 'src/app/interfaces/palabraWordle';
import { AuthService } from 'src/app/services/auth.service';
import { WordleService } from 'src/app/services/wordle.service';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.page.html',
  styleUrls: ['./wordle.page.scss'],
})
export class WordlePage {

  palabrasIntentos: PalabraWordle[] = [];
  mostrarInput = true;
  mostrarMensajeGana = false;
  mostrarMensajePierde = false;
  palabraDia = "";
  uid = "";
  fechaActual = "";
  abrirModal = false;
  resultado = "ganado";

  constructor(
    private wordleServ: WordleService,
    private toastController: ToastController,
    private authServ: AuthService
  ) { }

  ionViewWillEnter() {
    this.loadData()
  }

  async loadData() {
    this.palabraDia = await this.wordleServ.palabraDia();

    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };
    var fecha = new Date();
    this.fechaActual = fecha.toLocaleString("es-ES", opcionesDeFormato);

    this.uid = this.authServ.getUid() ?? '';

    this.wordleServ.misJugadas(this.uid).subscribe({
      next: (palabras: PalabraWordle[]) => {
        const palabraVacia: PalabraWordle = {
          orden: 6,
          fecha: this.fechaActual,
          palabra: '',
          respuesta: ''
        };
        const palabrasCompletas = palabras.concat(Array.from({ length: 6 - palabras.length }, () => palabraVacia));

        this.palabrasIntentos = palabrasCompletas.sort((a, b) => a.orden - b.orden);

        const haGanado = this.palabrasIntentos.some(palabra => palabra.respuesta === "VVVVV");

        if (haGanado) {
          this.mostrarInput = false;
          this.mostrarMensajeGana = true;
          this.resultado = "ganado";
          this.abrirModal = true;
        } else if (this.palabrasIntentos[5].palabra != '' && this.palabrasIntentos[5].respuesta != "VVVVV") {
          this.mostrarInput = false;
          this.mostrarMensajePierde = true;
          this.resultado = "perdido";
          this.abrirModal = true;
        }
      }
    });
  }


  agregarPalabra(event: any) {
    const palabra = event.target.value;
    if (palabra.length >= 5) {
      event.target.value = '';
      this.wordleServ.addJugada(this.uid, palabra)
    } else {
      this.presentToast("close", "La palabra debe tener 5 letras", "danger");
    }
  }


  async presentToast(icono: string, mensaje: string, color: string) {
    const toast = await this.toastController.create({
      icon: icono,
      message: mensaje,
      color: color,
      duration: 2500,
      position: 'top',
    });

    await toast.present();
  }
}