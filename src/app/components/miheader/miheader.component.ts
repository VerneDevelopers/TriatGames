import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miheader',
  templateUrl: './miheader.component.html',
  styleUrls: ['./miheader.component.scss'],
})
export class MiheaderComponent  implements OnInit {

  usuario : string = "Alex@gmail.com"
  
  constructor() { 
    
  }

  ngOnInit() {}

}
