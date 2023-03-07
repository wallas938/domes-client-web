import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products.component";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  {
    path: "", component: ProductsComponent,
    // children: [
    //   {
    //     path: 'new-feedback', component: FeedbackFormComponent
    //   },
    //   {
    //     path: ':id',
    //     component: FeedbackDetailComponent,
    //   },
    //
    //   {
    //     path: ':id/edit-feedback',
    //     component: FeedbackFormComponent,
    //   },
    // ]
  },
  {
    path: ":id", component: ProductComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
