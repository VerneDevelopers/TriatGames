import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  constructor(
    private AuthSvc: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() { }

  async submit() {
    //Comprobamos si los valores son válidos
    if (this.form.valid) {
      this.showLoading()
      //Almacenamos los valores que nos hacen falta
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      const nombre = this.form.get('name')?.value;
      if (email && password && nombre) {
        try {
          // Utilizamos el método de registro del servicio AuthService de Oscar
          const userCredential = await this.AuthSvc.register(email, password,nombre);
          if (userCredential!=null) {
            // Si el registro es existoso, dirigimos al usuario al home
            this.router.navigateByUrl('home')
            //Terminamos el loading una vez en el home
            this.loadingCtrl.dismiss();
          }else
          {
              console.log("ERROR")
              this.presentToast({
                message: 'Puede ser que ya estes registrado...?',
                duration: 1500,
                position: 'middle',
                color: 'primary',
                icon: 'alert-circle-outline'
              })
          }
        } catch (error) {
          console.log("ERROR",error)
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
