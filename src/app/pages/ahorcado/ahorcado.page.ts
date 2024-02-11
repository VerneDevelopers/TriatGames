import { Component, OnInit } from '@angular/core';
import { AhorcadoService } from 'src/app/services/ahorcado/ahorcado.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.page.html',
  styleUrls: ['./ahorcado.page.scss'],
})
export class AhorcadoPage implements OnInit {

  constructor(private miServicio:AhorcadoService) {
  }

  ngOnInit() {
    var fecha:Date=new Date()
    this.miServicio.getLetraporDia("userid",fecha).subscribe(
      (s) => {
        console.log(s)
      },
      (error) => console.error(error)
    );
  }

}
