import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {TokenInterceptor} from "./token.interceptor";


@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }]
})
export class CoreModule {
}
