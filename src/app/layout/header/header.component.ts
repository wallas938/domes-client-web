import {Component, OnInit} from '@angular/core';
import {ClientSelectors} from "../../../store/selectors/client.selectors";
import {ClientGetDTO} from "../../models/client";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {DOMES_BASE_PATHS} from "../../models/domes-url";
import {RouterSelectors} from "../../../store/selectors/router.selectors";
import {Router} from "@angular/router";
import {AuthenticationActions} from "../../../store/actions/authentication.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  DOMES_BASE_PATHS = DOMES_BASE_PATHS
  client: ClientGetDTO | undefined
  currentPath: string | undefined;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(ClientSelectors.selectClient).subscribe(value => {
      this.client = value;
    })
    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {
      this.currentPath = value;
    })
  }

  handleClick() {
    if (this.client?.id) {
      this.disconnection();
      return
    }
    this.router.navigate([DOMES_BASE_PATHS.LOGIN]).then()
  }

  disconnection() {
    this.store.dispatch(AuthenticationActions.LogoutClientStart());
  }
}
