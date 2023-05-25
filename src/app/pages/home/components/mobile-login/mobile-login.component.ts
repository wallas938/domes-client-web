import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../signup/signup.component";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../../../store/reducers";
import {ClientService} from "../../../../services/client/client.service";
import {Router} from "@angular/router";
import {Credentials} from "../../../../models/authentication";
import {AuthenticationActions} from "../../../../../store/actions/authentication.actions";

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.scss']
})
export class MobileLoginComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              private clientService: ClientService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.loginForm.invalid) return;

    const credentials: Credentials = {
      email: this.loginForm.get('email')!.value!.toLowerCase(),
      password: this.loginForm.get('password')!.value!.toLowerCase(),
    }

    this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFromLoginStart({credentials}))

  }

  ngOnDestroy(): void {
  }
}
