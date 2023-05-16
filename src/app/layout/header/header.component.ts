import {Component, OnInit} from '@angular/core';
import {ClientSelectors} from "../../../store/selectors/client.selectors";
import {ClientGetDTO} from "../../models/client";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  client$: Observable<ClientGetDTO> | undefined
  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.client$ = this.store.select(ClientSelectors.selectClient)
  }

}
