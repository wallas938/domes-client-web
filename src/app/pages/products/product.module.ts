import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ProductsComponent} from "./products.component";
import {ProductRoutingModule} from "./product-routing.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    SharedModule,
    ProductRoutingModule,
  ],
  exports: [ProductsComponent]
})
export class ProductModule {
}
