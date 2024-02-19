import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioWordleService } from 'src/app/services/servicio-wordle.service';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.page.html',
  styleUrls: ['./wordle.page.scss'],
})
export class WordlePage {

  palabrasIntentos = ['','','','','',''];
  mostrarInput = true;
  mostrarMensajeGana = false;
  mostrarMensajePierde = false;
  palabraDia = "";
  uid = "";
  fechaActual = "";

  constructor(
    private wordleServ: ServicioWordleService,
    private toastController: ToastController,
    private authServ: AuthService
  ) { }

  ionViewWillEnter() {
    this.loadData()   
  }

  loadData() {
    this.palabraDia = this.wordleServ.palabraDia()
    
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };
    var fecha = new Date();
    this.fechaActual = fecha.toLocaleString("es-ES", opcionesDeFormato);

    this.uid = this.authServ.getUid() ?? '';

    this.wordleServ.misJugadas(this.uid, this.fechaActual).subscribe({
      next: (palabras: any[]) => {
        this.palabrasIntentos = palabras;
        if (this.palabrasIntentos[5] != '' && this.palabrasIntentos[5] != "VVVVV") {
          this.mostrarInput = false;
          this.mostrarMensajePierde = true;
        } 
      }
    }) 
  }

  aciertos(palabra: string) : string {
    if (palabra != "") {
      const respuesta = this.wordleServ.calcularRespuesta(palabra);
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
      event.target.value = '';
      this.wordleServ.addJugada(this.uid, palabra, this.fechaActual)
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
