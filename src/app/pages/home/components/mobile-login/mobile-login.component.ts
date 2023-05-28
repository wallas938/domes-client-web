import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../signup/signup.component";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../../../store/reducers";
import {ClientService} from "../../../../services/client/client.service";
import {Router} from "@angular/router";
import {Credentials} from "../../../../models/authentication";
import {AuthenticationActions} from "../../../../../store/actions/authentication.actions";
import {ClientActions} from "../../../../../store/actions/client.actions";
import {ClientSelectors} from "../../../../../store/selectors/client.selectors";

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.scss']
})
export class MobileLoginComponent implements OnInit, OnDestroy {
  mobileLoginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              private clientService: ClientService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(ClientSelectors.selectClient).subscribe(value => {
      if(value.id) {
        this.router.navigate(['home']).then();
      }
    })
  }

  submit() {
    if (this.mobileLoginForm.invalid) return;

    const credentials: Credentials = {
      email: this.mobileLoginForm.get('email')!.value!.toLowerCase(),
      password: this.mobileLoginForm.get('password')!.value!,
    }
    this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFromLoginStart({credentials}))
  }

  ngOnDestroy(): void {
  }
}
