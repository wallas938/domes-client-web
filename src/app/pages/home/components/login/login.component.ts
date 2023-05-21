import {Component, OnInit} from '@angular/core';
import {DOMES_BASE_PATHS} from "../../../../models/domes-url";
import {LayoutActions} from "../../../../../store/actions/layout.actions";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../../../store/reducers";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {RouterSelectors} from "../../../../../store/selectors/router.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  currentPath: Observable<string>;
  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              private router: Router) {
    this.currentPath = this.store.select(RouterSelectors.selectRouterUrl)
  }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.LOGIN == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    });
  }
}
