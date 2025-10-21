import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"

import { MensajesPageRoutingModule } from "./mensajes-routing.module"
import { MensajesPage } from "./mensajes.page"

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MensajesPageRoutingModule],
  declarations: [MensajesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MensajesPageModule {}
