import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ServicioWordleService } from 'src/app/services/servicio-wordle.service';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.page.html',
  styleUrls: ['./wordle.page.scss'],
})
export class WordlePage {

  palabrasIntentos = ['','','','','',''];
  palabraDia = "";
  mostrarInput = true;
  mostrarMensajeGana = false;
  mostrarMensajePierde = false;

  constructor(
    private wordleServ: ServicioWordleService,
    private toastController: ToastController
  ) { }

  ionViewWillEnter() {
    this.loadData()   
  }

  async loadData() {
    this.palabraDia = await this.wordleServ.palabraDia()
  }

  aciertos(palabra: string) : string {
    if (palabra != "") {
      const respuesta = this.wordleServ.calcularRespuesta(palabra, this.palabraDia);
      if (respuesta === "VVVVV") {
        this.mostrarInput = false;
        this.mostrarMensajeGana = true;
      }
      return respuesta;
    } else {
      return "";
    }
  }

  agregarPalabra(event: any) {
    const palabra = event.target.value;
    if (palabra.length >= 5) {
      const index = this.palabrasIntentos.findIndex(p => p === '');
      if (index !== -1) {
        this.palabrasIntentos[index] = palabra.toUpperCase();
        event.target.value = ''; // Limpiar el input después de agregar la palabra
        if (this.palabrasIntentos.every(p => p !== '')) {
          if (!this.palabrasIntentos.includes(this.palabraDia.toUpperCase())) {
            this.mostrarInput = false;
            this.mostrarMensajePierde = true;
          }
        }
      }
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
