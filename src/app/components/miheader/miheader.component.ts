import { Component, OnInit } from '@angular/core';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-miheader',
  templateUrl: './miheader.component.html',
  styleUrls: ['./miheader.component.scss'],
})
export class MiheaderComponent  implements OnInit {

  usuario : string = "manueljesus.casado.gomez.alu@iesjulioverne.e"
  gravatarURL: string = '';
  avatarURL: string = '';

  getGravatarURL(email: string): string {
    const address = email.trim().toLowerCase();
    const hash = sha256(address);
    return `https://www.gravatar.com/avatar/${hash}?d=${this.avatarURL}`;
  }
  avatarPrimeraLetra(){
    const primeraLetra = this.usuario.substring(0, 1)
    const urlSinEncode= `https://ui-avatars.com/api/?name=${primeraLetra}&background=0D8ABC&color=fff&size=128`
    //cambiar loclhost con variable de enviroment 
    const encodedURL = encodeURIComponent("http://localhost:8100/assets/icon/favicon.png")
    console.log(encodedURL)
    return encodedURL
  }
  
  constructor() {}

  ngOnInit() {
    this.avatarURL= this.avatarPrimeraLetra()
    this.gravatarURL = this.getGravatarURL(this.usuario);
  }



}
