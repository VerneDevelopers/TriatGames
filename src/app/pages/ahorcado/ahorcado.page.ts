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
 userUid: string
 fecha !: Date
 dataHoy: any[] = []
 //palabraDia !: any
 palabraDia = 'pandereta'
 palabraOculta = '_'.repeat(this.palabraDia.length)
 letra: string = ''
 vidas: number = 8
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
 ruta: string = "../../../assets/imgAhorcado/"
 indiceImagen: number = 0;
 constructor(private serv: AhorcadoService, private auth: Auth) {
   if (this.auth.currentUser?.uid != null)
     this.userUid = this.auth.currentUser?.uid.toString()
   else
     this.userUid = 'Error'




   this.fecha = new Date()
   console.log(this.userUid)
   //this.serv.getPalabraDia(this.fecha).subscribe( resp => { this.palabraDia = resp})
   console.log('Palabra del dia' + this.palabraDia)
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


 ionViewWillEnter() {
   this.serv.getLetraporDia(this.userUid, new Date()).subscribe(resp => {
     this.dataHoy = resp;
     console.log(this.dataHoy)
   })
 }








 addLetra() {
   this.serv.addJugada(this.userUid, this.letra, this.fecha)
   if (this.palabraDia.includes(this.letra)) {
     for (let i = 0; i < this.palabraDia.length; i++) {
       if (this.palabraDia[i] === this.letra) {
         // Reemplaza el guion bajo (_) en la posición i con la letra adivinada
         this.palabraOculta = this.palabraOculta.substring(0, i) + this.letra + this.palabraOculta.substring(i + 1);
       }
     }
   } else {
     this.indiceImagen++;
     if (this.indiceImagen >= this.ahorcadoImgs.length) {
       this.indiceImagen = 8;
     }
   }


   if (this.palabraDia === this.palabraOculta) {
     console.log('Aquí se gana, pero no se donde ponerlo jijuji');




   }
 }






}






