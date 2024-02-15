import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AhorcadoService } from 'src/app/services/ahorcado/ahorcado.service';


@Component({
 selector: 'app-ahorcado',
 templateUrl: './ahorcado.page.html',
 styleUrls: ['./ahorcado.page.scss'],
})
export class AhorcadoPage implements OnInit {
 userUid : string
 fecha !: Date
 letra : string = ''
 constructor(private serv : AhorcadoService, private auth : Auth) {
   if(this.auth.currentUser?.uid != null)
   this.userUid = this.auth.currentUser?.uid.toString()
   else
   this.userUid = 'Error'


   this.fecha = new Date()
 }


 ngOnInit() {
   /*
   var fecha:Date=new Date()
   this.miServicio.getLetraporDia("userid",fecha).subscribe(
     (s) => {
       console.log(s)
     },
     (error) => console.error(error)
   );
   */


 }




 addLetra(){
   //this.serv.addJugada(this.userUid,this.letra,this.fecha)
   this.letra = ''
 }


}





