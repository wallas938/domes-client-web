import { Injectable } from '@angular/core';
import {environment} from "../../env/environment";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/reducers";
import {Observable} from "rxjs";
import {AuthenticationTokenResponse, Credentials} from "../models/authentication";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticationUrl = environment.apiURL + '/auth/client-authentication';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

  login(credentials: Credentials): Observable<AuthenticationTokenResponse> {
    return this.http.post<AuthenticationTokenResponse>(`${this.authenticationUrl}`,
      credentials,
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }
}
