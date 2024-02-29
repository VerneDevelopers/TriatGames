import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { FinJuegoComponent } from '../fin-juego/fin-juego.component';

@Component({
  selector: 'app-abrir-modal-fin',
  templateUrl: './abrir-modal-fin.component.html',
  styleUrls: ['./abrir-modal-fin.component.scss'],
})
export class AbrirModalFinComponent  implements OnInit {
  @Input() resultado = "";
  @Input() idJuego = "";
  
  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    if (this.resultado == "ganado") {
      this.abrirModal(true);
    } else {
      this.abrirModal(false);
    }
  }

  async abrirModal(res: boolean) {
    const modal = await this.modalController.create({
      component: FinJuegoComponent,
      componentProps: {
        resultado: res,
        juego: this.idJuego
      },
      canDismiss: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }
}
