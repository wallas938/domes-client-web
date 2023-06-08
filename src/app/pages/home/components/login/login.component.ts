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
import {AuthenticationSelectors} from "../../../../../store/selectors/authentication.selectors";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertMessageComponent} from "../../../../shared/components/alert-message/alert-message.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  currentPath: Observable<string>;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.currentPath = this.store.select(RouterSelectors.selectRouterUrl)
  }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.LOGIN == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    });

    this.store.select(AuthenticationSelectors.selectAuthenticationError).subscribe(error => {
      if (error) {
        console.log(error)
        this.store.dispatch(AuthenticationActions.ResetAuthenticationError())
        return this.showSnackBar({message: error.message, style: {color: "red"}});
      }
    })
  }

  showSnackBar(data: { message: string, style: any }) {
    this._snackBar.openFromComponent(AlertMessageComponent, {
      data: data,
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
