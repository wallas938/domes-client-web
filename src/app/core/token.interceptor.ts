import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/reducers";
import {selectAuthenticationToken} from 'src/store/selectors/authentication.selectors';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.store.select(selectAuthenticationToken)) {
      console.log(this.store.select(selectAuthenticationToken))
      //  const token = this.appStore.getToken();
      //
      // const headers = new HttpHeaders({
      //   "Authorization": "token",
      // });
      //
      // const clone = req.clone({ headers });
      //
      // return next.handle(clone);
    }
    return next.handle(req);
  }
}
