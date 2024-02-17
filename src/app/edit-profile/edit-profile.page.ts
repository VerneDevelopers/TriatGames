import { Component, OnInit } from '@angular/core';
import { Jugador } from '../interfaces/jugador';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  nombre !: string;
  fechaNacimiento !: string;
  enlaceCambiarPass !: string;
  enlaceBorrarCuenta !: string;
  datosEditar: Jugador = {
    nombre: "Ale",
    fechaNacimiento: "18/08/90"
  };
  constructor() { }

  ngOnInit() {
  }

  setDatos() {
    const datosEditados = {
      nombre: this.nombre,
      fechaNacimiento : this.fechaNacimiento
    }
    //Método que modifica en firebase
  }

}
