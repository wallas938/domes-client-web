import {Component, OnInit} from '@angular/core';
import {DOMES_BASE_PATHS} from "../../../../models/domes-url";
import {LayoutActions} from "../../../../../store/actions/layout.actions";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../../../store/reducers";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RouterSelectors} from "../../../../../store/selectors/router.selectors";
import {Observable} from "rxjs";
import {Credentials} from "../../../../models/authentication";
import {AuthenticationActions} from "../../../../../store/actions/authentication.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

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

  submit() {
    if (this.loginForm.invalid) return;

    const credentials: Credentials = {
      email: this.loginForm.get('email')!.value!.toLowerCase(),
      password: this.loginForm.get('password')!.value!,
    }
    this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFromLoginStart({credentials}))

  }
}
