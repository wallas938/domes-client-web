import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {DomesButtonComponent} from './components/domes-button/domes-button.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatBadgeModule} from '@angular/material/badge';

import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatPaginatorModule} from '@angular/material/paginator';
import {GetPropertyValueByName} from "./pipes/GetPropertyValueByName";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";


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
    MatSnackBarModule,
    MatBottomSheetModule,
    InfiniteScrollModule,
    MatBadgeModule
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
    MatSnackBarModule,
    MatBottomSheetModule,
    InfiniteScrollModule,
    MatBadgeModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
})
export class SharedModule {
}
