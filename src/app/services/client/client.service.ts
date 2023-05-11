import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from 'src/store/reducers/index';
import {Observable} from "rxjs";
import {environment} from 'src/env/environment';
import {ClientGetDTO, ClientPostDTO} from "../../models/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientUrl = environment.apiURL + '/auth/signup';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

  postClient(data: ClientPostDTO): Observable<ClientGetDTO> {
    return this.http.post<ClientGetDTO>(`${this.clientUrl}`,
      data,
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }
}

