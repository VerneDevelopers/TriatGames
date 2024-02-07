import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private AuthSvc: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,) { }

  ngOnInit() {
  }

  //Aqui se deberan mandar los datos a firebase 
  async submit() {
    //Comprobamos si los valores son válidos
    if (this.form.valid) {
      this.showLoading()
      //Almacenamos los valores que nos hacen falta
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      if (email && password) {
        try {
          // Utilizamos el método de registro del servicio AuthService de Oscar
          const userCredential = await this.AuthSvc.login(email, password);
          if (userCredential) {
            // Si el registro es existoso, dirigimos al usuario al home
            this.router.navigateByUrl('home')
            //Terminamos el loading una vez en el home
            this.loadingCtrl.dismiss();
          }
        } catch (error) {
          console.log(error)
          this.presentToast({
            message: 'Ha ocurrido un error',
            duration: 1500,
            position: 'middle',
            color: 'primary',
            icon: 'alert-circle-outline'
          })
        } finally {
          this.loadingCtrl.dismiss();
        }
      }
    }
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'espere...',
    });

    loading.present();
  }

}
