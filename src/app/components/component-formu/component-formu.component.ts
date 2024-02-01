import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-component-formu',
  templateUrl: './component-formu.component.html',
  styleUrls: ['./component-formu.component.scss'],
})
export class ComponentFormuComponent  implements OnInit {

  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;
  @Input() placeholder!: string;

  isPassword!: boolean
  hide: boolean = true

  constructor() { }

  ngOnInit() {
    if (this.type == 'password') this.isPassword = true;
  }

  changeVisibilityPassword(){
    this.hide = !this.hide

    if(this.hide) this.type ='password';
    else this.type ='text';
  }


}
