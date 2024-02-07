import { Component } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { FinJuegoComponent } from '../components/fin-juego/fin-juego.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  async abrirModal() {
    const modal = await this.modalController.create({
      component: FinJuegoComponent,
      componentProps: {
        resultado: true,
      },
      canDismiss: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }
}
