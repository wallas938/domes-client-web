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
import {AuthenticationSelectors} from "../../../../../store/selectors/authentication.selectors";
import {AlertMessageComponent} from "../../../../shared/components/alert-message/alert-message.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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
              private router: Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.store.select(ClientSelectors.selectClient).subscribe(value => {
      if (value.id) {
        this.router.navigate(['home']).then();
      }
    })

    this.store.select(AuthenticationSelectors.selectAuthenticationError).subscribe(error => {
      if(error) {
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
    if (this.mobileLoginForm.invalid) return;

    const credentials: Credentials = {
      email: this.mobileLoginForm.get('email')!.value!.toLowerCase(),
      password: this.mobileLoginForm.get('password')!.value!,
    };
    this.store.dispatch(AuthenticationActions.GetAuthenticationTokenFromLoginStart({credentials}));
  }

  ngOnDestroy(): void {
  }
}
