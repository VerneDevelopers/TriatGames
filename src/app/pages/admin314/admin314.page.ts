import { Component, OnInit } from '@angular/core';
import { AhorcadoService } from 'src/app/services/ahorcado.service';
import { WordleService } from 'src/app/services/wordle.service';

@Component({
  selector: 'app-admin314',
  templateUrl: './admin314.page.html',
  styleUrls: ['./admin314.page.scss'],
})
export class Admin314Page implements OnInit {

  constructor(private wordleservice: WordleService, private ahorcadoservice: AhorcadoService) { }

  ngOnInit() {
  }

  lines: string[] = [];
  lines2: string[] = [];


  CargarWordle(event: any) {
    this.CargarPalabras(event, "wordle")
  }

  CargarAhorcado(event: any) {
    this.CargarPalabras(event, "ahorcado")
  }

  CargarPalabras(event: any, juego: string) {
    console.log(juego)
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();
    var palabras: string[] = [];
    reader.onload = (e) => {
      const fileContent: string = reader.result as string;

      this.lines = fileContent.split('\n');
      this.Desordenar(this.lines);
      if (juego == "ahorcado") {
        this.ahorcadoservice.cargarPalabras(this.lines, new Date());
      } else {
        this.wordleservice.cargarPalabras(this.lines, new Date());
      }

    };

    reader.readAsText(file);

  }

  calcularPalabraHoy(juego: string) {
    if (juego == "ahorcado") {
      this.ahorcadoservice.palabraDia().then(
        resp => {
          console.log(resp)
        }
      );
    }
    else {
      this.wordleservice.palabraDia().then(
        resp => {
          console.log(resp)
        }
      );
    }
  }
  Desordenar(array: string[]) {
    // Función de comparación aleatoria
    function compareRandom() {
      return Math.random() - 0.5;
    }
    array.sort(compareRandom);
  }
}


