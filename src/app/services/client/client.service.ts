import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from 'src/store/reducers/index';
import {Observable} from "rxjs";
import {environment} from 'src/env/environment';
import {ClientPostDTO} from "../../models/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientUrl = environment.apiURL + '/clients';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

  postClient(data: ClientPostDTO): Observable<void> {
    return this.http.post<void>(`${this.clientUrl}`,
      data,
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
  }
}

