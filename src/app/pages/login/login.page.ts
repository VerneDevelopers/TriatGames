import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScoreService } from 'src/app/services/score.service';

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

  constructor(private serv: ScoreService) {
    this.serv.getPuntuacion().subscribe((s) => {
      console.log(s)
    }
    )
  }

  ngOnInit() {
  }

  //Aqui se deberan mandar los datos a firebase 
  submit(){ }

}
