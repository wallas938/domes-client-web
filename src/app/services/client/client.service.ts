import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from 'src/store/reducers/index';
import {Observable} from "rxjs";
import {environment} from 'src/env/environment';
import {ClientGetDTO, ClientPostDTO} from "../../models/client";
import {AuthenticationTokenResponse} from "../../models/authentication";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private authUrl = environment.apiURL + '/auth';
  private clientUrl = environment.apiURL + '/clients';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

  postClient(data: ClientPostDTO): Observable<ClientGetDTO> {
    return this.http.post<ClientGetDTO>(`${this.authUrl}/signup`,
      data,
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }

  getClient(email: string): Observable<ClientGetDTO> {
    return this.http.get<ClientGetDTO>(`${this.clientUrl}?email=${email}`,
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }
}

