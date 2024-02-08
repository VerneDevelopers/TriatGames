import { Component } from '@angular/core';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private serv: ScoreService) {
    this.serv.getPuntuacion().subscribe((s) => {
      console.log(s)
    }
    )
  }
}
