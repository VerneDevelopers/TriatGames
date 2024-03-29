import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../interfaces/jugador';
import { AuthService } from '../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {
  nombreIngresado !: string;
  // fechaNacimiento !: string;
  password !: string;

  datosEditar: Jugador = {
    nombre: "Ale",
    fechaNacimiento: "18/08/90"
  };

  constructor(private auth: Auth, private authService: AuthService, private alertController: AlertController, private router: Router) { }

  guardarNombre() {
    this.alertFormulario("Editar nombre");
    //Tenemos que valorar cómo y cuándo guardar un jugador para poder guardar nombre y modificarlo si hace falta
  }

  cambiarPassword() {
    var email = this.auth.currentUser?.email;
    this.authService.resetPassword(email!!);
    this.alert("En unos instantes recibirá un mensaje de correo electrónico con las instrucciones para cambiar la contraseña", "Cambio de contraseña en proceso")
  }

  borrarCuenta() {
    this.alertBorrado("Está apunto de borrar la cuenta de forma permanente ¿Quiere seguir?", "Borrado permanente");
  }

  async alert(mensaje: string, cabecera: string) {
    const alert = await this.alertController.create({
      header: cabecera,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async alertBorrado(mensaje: string, cabecera: string) {
    const alert = await this.alertController.create({
      header: cabecera,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.authService.eliminarCuenta();
            this.router.navigate(['login']);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar clicado');
          }
        }
      ]
    });
    await alert.present();
  }


  async alertFormulario(cabecera: string) {
    const alert = await this.alertController.create({
      header: cabecera,
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Ingresa tu nombre'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'OK',
          handler: (data) => {
            this.nombreIngresado = data.nombre;
          }
        }
      ]
    });
    await alert.present();
  }
}

