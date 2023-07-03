import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {ProductsComponent} from "./products.component";
import {ProductRoutingModule} from "./product-routing.module";
import { ProductComponent } from './product/product.component';
import { FilterComponent } from './filter/filter.component';
import {NgOptimizedImage} from "@angular/common";


@NgModule({
  declarations: [ProductsComponent, ProductComponent, FilterComponent],
  imports: [
    SharedModule,
    ProductRoutingModule,
    NgOptimizedImage,
  ],
  exports: [ProductsComponent]
})
export class ProductModule {

}
