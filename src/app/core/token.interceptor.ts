import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {first, last, Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/reducers";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token_id");

    if(token) {
      const headers = new HttpHeaders({
        Authorization: token,
      });

      const clone = req.clone({ headers });

      return next.handle(clone);
    }
    return next.handle(req);
  }
}
