import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManuCasadoComponent } from "./manu-casado/manu-casado.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentFormuComponent } from "./component-formu/component-formu.component";

@NgModule({
  declarations: [ManuCasadoComponent, ComponentFormuComponent],
  exports: [ManuCasadoComponent, ComponentFormuComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
})
export class ComponentsModule {}
