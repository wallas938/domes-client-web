import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartComponent} from "./cart.component";
import {CartRoutingModule} from "./cart-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [CartComponent],
    imports: [
        CommonModule,
        CartRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
  exports: [CartComponent]
})
export class CartModule { }
