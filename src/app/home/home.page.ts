import { Component } from '@angular/core';
import { ServicioWordleService } from '../services/servicio-wordle.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private servi : ServicioWordleService) {}

  /*ngOnInit() {
    
  }

  fire() {
    var idUser = "pepe"
    var palabra = "barco"
    var fecha = "04-02-2024"
    
    this.servi.addJugada(idUser, palabra, fecha)
  }*/

  fecha() {
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };
    var fecha = new Date();

    var fechaString : string = fecha.toLocaleString("es-ES", opcionesDeFormato);

    console.log(fechaString)
  }

  palabra() {
    var palabra = this.servi.palabraDia()
    console.log(palabra)
  }

    

}
