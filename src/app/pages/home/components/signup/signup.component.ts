import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";


import * as fromApp from "../../../../../store/reducers";
import {selectRouterParams, selectRouterUrl} from 'src/store/selectors/router.selectors';
import {DOMES_BASE_PATHS} from "../../../../models/domes-url";
import {LayoutActions} from 'src/store/actions/layout.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.select(selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.SIGNUP == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    })
  }

  ngOnDestroy(): void {
  }
}
