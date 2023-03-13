import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {Store} from "@ngrx/store";
import * as fromApp from 'src/store/reducers';
import {LayoutSelectors} from 'src/store/selectors/layout.selectors';
import {LayoutActions} from 'src/store/actions/layout.actions';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit, OnDestroy {

  mobileMenuOpened: Observable<boolean> | undefined;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.mobileMenuOpened = this.store.select(LayoutSelectors.selectMobileMenuOpened)
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
