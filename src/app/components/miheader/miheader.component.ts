import { Component, OnInit } from '@angular/core';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-miheader',
  templateUrl: './miheader.component.html',
  styleUrls: ['./miheader.component.scss'],
})
export class MiheaderComponent  implements OnInit {

  usuario : string = "manueljesus.casado.gomez.alu@iesjulioverne.es"

  getGravatarURL(email: string): string {
    // Trim leading and trailing whitespace from
    // an email address and force all characters
    // to lower case
    const address = email.trim().toLowerCase();

    // Create a SHA256 hash of the final string
    const hash = sha256(address);

    // Grab the actual image URL
    return `https://www.gravatar.com/avatar/${hash}`;
  }
  
  constructor() { 
    
  }

  ngOnInit() {}

}
