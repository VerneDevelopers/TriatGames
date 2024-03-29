import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { sha256 } from 'js-sha256';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {


  avatarURL: string = '';
  correo="";
  ngOnInit() { 
    this.auth.getUserProfile().subscribe((user)=>{
      this. correo = user.email;
      this.getGravatarUrl(this.correo);
    });
  
  }

  constructor(private http: HttpClient,private auth:AuthService) {
  }

  getGravatarUrl(email: string): void {
    const hash = sha256(email.trim().toLowerCase());
  
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=404`;

    this.http.head(gravatarUrl, { observe: 'response' }).subscribe(
      response => {
        if (response.status === 200) {
          this.avatarURL = `https://www.gravatar.com/avatar/${hash}`;
        }
      },
      error => {
        this.avatarURL = this.avatarPrimeraLetra();
      }
    );
  }

  avatarPrimeraLetra() {
    const primeraLetra = this.correo.substring(0, 1)
    return `https://ui-avatars.com/api/?name=${primeraLetra}&background=0D8ABC&color=fff&size=128`
  }
}
