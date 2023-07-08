import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from 'src/store/reducers';
import {LayoutActions} from 'src/store/actions/layout.actions';
import {DOMES_BASE_PATHS} from "../../../../models/domes-url";
import {RouterSelectors} from "../../../../../store/selectors/router.selectors";
import {Observable, tap} from "rxjs";
import {ClientSelectors} from "../../../../../store/selectors/client.selectors";
import {ClientGetDTO} from "../../../../models/client";
import {Router} from "@angular/router";
import {AuthenticationActions} from "../../../../../store/actions/authentication.actions";
import {CartSelectors} from "../../../../../store/selectors/cart.selectors";
import {AnimalGetDTO} from "../../../../models/animal";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  cart: AnimalGetDTO[] = [];
  DOMES_BASE_PATHS = DOMES_BASE_PATHS
  currentPath: Observable<string>;
  isConnected: boolean = false;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
    this.currentPath = this.store.select(RouterSelectors.selectRouterUrl);
  }

  ngOnInit(): void {
    this.store.select(CartSelectors.selectCart).subscribe(value => {
      this.cart = value
    });

    this.store.select(ClientSelectors.selectClient).subscribe((clientGetDTO: ClientGetDTO) => {
      this.isConnected = !!clientGetDTO.id;
    });
  }

  closeMenu() {
    this.store.dispatch(LayoutActions.MobileMenuClosed());
  }

  handleClick() {
    if (this.isConnected) {
      this.disconnection();
      return
    }
    this.router.navigate([DOMES_BASE_PATHS.LOGIN]).then()
  }

  disconnection() {
    this.store.dispatch(AuthenticationActions.LogoutClientStart());
  }
}
