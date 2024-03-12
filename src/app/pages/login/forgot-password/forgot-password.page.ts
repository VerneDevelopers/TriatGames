import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })


  constructor(
    private authSvc:AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {
      this.showLoading();
      
      let email = this.form.value.email;
      
      this.authSvc.resetPassword(email!).then(res => {
        this.presentToast({
          message: "Correo enviado con éxito",
          duration: 1500,
          position: 'middle',
          color: 'primary',
          icon: 'mail-outline'
        });
        this.form.reset();
      }).catch(error => {
        console.log(error);
        this.presentToast({
          message: error.message,
          duration: 1500,
          position: 'middle',
          color: 'primary',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        this.loadingCtrl.dismiss();
      });
    }
  };

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'espere...',
    });

    loading.present();
  }

  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }


}
