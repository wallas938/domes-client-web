import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {DomesButtonComponent} from './components/domes-button/domes-button.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
@NgModule({
  declarations: [
    DomesButtonComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatSliderModule,
  ],
  exports: [
    CommonModule,
    DomesButtonComponent,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatSliderModule,
  ],
  providers: [],
})
export class SharedModule {
}
