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
import {GetPropertyValueByName} from "./pipes/GetPropertyValueByName";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';


@NgModule({
  declarations: [
    DomesButtonComponent,
    GetPropertyValueByName,
    AlertMessageComponent
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
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    DomesButtonComponent,
    AlertMessageComponent,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    GetPropertyValueByName,
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
})
export class SharedModule {
}
