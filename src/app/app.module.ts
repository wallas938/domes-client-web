import {NgModule, isDevMode} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {HeaderMobileComponent} from './layout/header-mobile/header-mobile.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {MenuComponent} from './layout/header-mobile/components/menu/menu.component';
import {HomeComponent} from "./pages/home/home.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


/*
* STORE IMPORTS
* */
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {reducers} from "src/store/reducers";
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {SignupComponent} from './pages/home/components/signup/signup.component'
import {AppEffects} from "../store/effects";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./core/token.interceptor";
import {NgOptimizedImage} from "@angular/common";
import { LoginComponent } from './pages/home/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMobileComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot(AppEffects),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    StoreRouterConnectingModule.forRoot(),
    NgOptimizedImage,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
