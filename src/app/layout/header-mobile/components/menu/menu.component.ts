import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from 'src/store/reducers';
import {LayoutActions} from 'src/store/actions/layout.actions';
import {DOMES_BASE_PATHS} from "../../../../models/domes-url";
import {RouterSelectors} from "../../../../../store/selectors/router.selectors";
import {Observable} from "rxjs";
import {ClientSelectors} from "../../../../../store/selectors/client.selectors";
import {ClientGetDTO} from "../../../../models/client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  DOMES_BASE_PATHS = DOMES_BASE_PATHS
  currentPath: Observable<string>;
  isConnected: boolean = false;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
    this.currentPath = this.store.select(RouterSelectors.selectRouterUrl)
  }

  ngOnInit(): void {
    this.store.select(ClientSelectors.selectClient).subscribe((clientGetDTO: ClientGetDTO) => {
      this.isConnected = !!clientGetDTO.id;
    });
  }

  closeMenu() {
    this.store.dispatch(LayoutActions.MobileMenuClosed());
  }

  login() {
    this.router.navigate(['login']).then(value => {})
  }
}
