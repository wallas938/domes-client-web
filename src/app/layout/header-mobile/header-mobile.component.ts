import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, of} from "rxjs";

import {Store} from "@ngrx/store";
import * as fromApp from 'src/store/reducers';
import {LayoutSelectors} from 'src/store/selectors/layout.selectors';
import {LayoutActions} from 'src/store/actions/layout.actions';
import {ClientSelectors} from "../../../store/selectors/client.selectors";
import {ClientGetDTO} from "../../models/client";
import {RouterSelectors} from "../../../store/selectors/router.selectors";
import {DOMES_BASE_PATHS} from "../../models/domes-url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit, OnDestroy {

  mobileMenuOpened$: Observable<boolean> | undefined;
  client$: Observable<ClientGetDTO | null> = of()

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.mobileMenuOpened$ = this.store.select(LayoutSelectors.selectMobileMenuOpened);
    this.client$ = this.store.select(ClientSelectors.selectClient).pipe(map((value: any) => {
      return value?.payload ? value?.payload : value;
    }));

  }

  ngOnDestroy(): void {
  }

  openMenu() {
    this.store.dispatch(LayoutActions.MobileMenuOpened())
  }

  closeMenu() {
    this.store.dispatch(LayoutActions.MobileMenuClosed())
  }
}
