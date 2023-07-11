import {Component, OnInit} from '@angular/core';
import {ClientSelectors} from "../../../store/selectors/client.selectors";
import {ClientGetDTO} from "../../models/client";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {DOMES_BASE_PATHS} from "../../models/domes-url";
import {RouterSelectors} from "../../../store/selectors/router.selectors";
import {Router} from "@angular/router";
import {AuthenticationActions} from "../../../store/actions/authentication.actions";
import {AnimalGetDTO} from "../../models/animal";
import {CartSelectors} from "../../../store/selectors/cart.selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  DOMES_BASE_PATHS = DOMES_BASE_PATHS
  client: ClientGetDTO | null = null;
  currentPath: string | undefined;
  cart: AnimalGetDTO[] = [];
  constructor(private store: Store<fromApp.AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(CartSelectors.selectCart).subscribe(value => {
      this.cart = value
    });
    this.store.select(ClientSelectors.selectClient).subscribe((value: any) => {
      if (value?.payload)
        this.client = value?.payload;
      else
        this.client = value
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
