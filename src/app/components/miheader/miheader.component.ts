import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-miheader',
  templateUrl: './miheader.component.html',
  styleUrls: ['./miheader.component.scss'],
})
export class MiheaderComponent  implements OnInit {

  constructor(private auth :AuthService, private router:Router) {}
  name : string = "user";
  email: string=  "user@email.com"
  ngOnInit() {
    this.auth.getUserProfile().subscribe((user)=>{
  //    console.log(user) 
      this.name = user.name;
      this.email = user.email;
    })
  }
  logout(){
    console.log("logout")
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
