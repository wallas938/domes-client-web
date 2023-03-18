import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {selectRouterUrl} from "../../../store/selectors/router.selectors";
import {DOMES_BASE_PATHS} from "../../models/domes-url";
import {LayoutActions} from "../../../store/actions/layout.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.select(selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.HOME == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    })
  }

  ngOnDestroy(): void {
  }
}
