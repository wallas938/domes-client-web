import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {DomesButtonComponent} from './components/domes-button/domes-button.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';


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
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,

  ],
  exports: [
    CommonModule,
    DomesButtonComponent,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule
  ],
  providers: [],
})
export class SharedModule {
}
