import {Component, OnInit} from '@angular/core';
import {ClientSelectors} from "../../../store/selectors/client.selectors";
import {ClientGetDTO} from "../../models/client";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {Observable, of, tap} from "rxjs";
import {DOMES_BASE_PATHS} from "../../models/domes-url";
import {RouterSelectors} from "../../../store/selectors/router.selectors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  DOMES_BASE_PATHS = DOMES_BASE_PATHS
  client$: Observable<ClientGetDTO> | undefined
  currentPath: string | undefined;
  constructor(private store: Store<fromApp.AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.client$ = this.store.select(ClientSelectors.selectClient)
    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {

    })
  }
}
