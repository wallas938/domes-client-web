import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import {first, Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/reducers";
import {AuthenticationSelectors} from 'src/store/selectors/authentication.selectors';
import {AuthenticationTokenResponse} from "../models/authentication";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.select(AuthenticationSelectors.selectAuthenticationToken)
      .pipe(first())
      .subscribe(
        (authenticationToken: AuthenticationTokenResponse) => {
          if (authenticationToken) {
            const token = authenticationToken.accessToken;
            const headers = new HttpHeaders({
              "Authorization": token,
            });
            const clone = req.clone({headers});

            return next.handle(clone);
          }
          return next.handle(req);
        });
    // if(this.store.select(selectAuthenticationToken)) {
    //   console.log(this.store.select(selectAuthenticationToken))
    //   //  const token = this.appStore.getToken();
    //   //
    //   // const headers = new HttpHeaders({
    //   //   "Authorization": "token",
    //   // });
    //   //
    //   // const clone = req.clone({ headers });
    //   //
    //   // return next.handle(clone);
    // }
    return next.handle(req);
  }
}
