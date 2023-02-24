import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from "@angular/common/http";
import { DomesButtonComponent } from './components/domes-button/domes-button.component';

@NgModule({
  declarations: [

    DomesButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    HttpClientModule,
    DomesButtonComponent
  ],
  providers: [],
})
export class SharedModule { }
