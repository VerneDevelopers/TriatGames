import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Data } from '@angular/router';
import { AhorcadoService } from 'src/app/services/ahorcado/ahorcado.service';


@Component({
 selector: 'app-ahorcado',
 templateUrl: './ahorcado.page.html',
 styleUrls: ['./ahorcado.page.scss'],
})
export class AhorcadoPage implements OnInit {
 userUid : string
 fecha !: Date
 dataHoy : Data [] = []
 letra : string = ''
 vidas : number = 8
 ahorcadoImgs: string[] = [
  '0.png',
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png'
 ]
 ruta : string = "../../../assets/imgAhorcado/"
 indiceImagen: number = 0;
 constructor(private serv : AhorcadoService, private auth : Auth) {
   if(this.auth.currentUser?.uid != null)
   this.userUid = this.auth.currentUser?.uid.toString()
   else
   this.userUid = 'Error'
   this.fecha = new Date()
   console.log(this.userUid)
   this.serv.getPalabraDia( this.fecha).subscribe( resp => { this.dataHoy = resp})
   console.log(this.dataHoy)
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
   this.serv.addJugada(this.userUid,this.letra,this.fecha)
   this.letra = ''
   this.indiceImagen++
 }


}





