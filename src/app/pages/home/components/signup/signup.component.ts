import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

import * as fromApp from "../../../../../store/reducers";
import {selectRouterParams, selectRouterUrl} from 'src/store/selectors/router.selectors';
import {DOMES_BASE_PATHS} from "../../../../models/domes-url";
import {LayoutActions} from 'src/store/actions/layout.actions';
import {ClientPostDTO} from "../../../../models/client";
import {ClientService} from "../../../../services/client/client.service";


export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password1 = control.get('password')?.value;
  const password2 = control.get('passwordConfirmation')?.value;

  if (password1 !== password2) {
    return {passwordMismatch: true};
  } else {
    return null;
  }
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm = this.fb.group({
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    zipCode: ['', Validators.required],
    email: ['', Validators.pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))],
    password: ['', Validators.pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))],
    passwordConfirmation: ['', Validators.pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))],
  }, {
    validators: passwordMatchValidator
  });

  constructor(private store: Store<fromApp.AppState>, private fb: FormBuilder, private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.store.select(selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.SIGNUP == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    })
  }

  submit() {
    if (this.signupForm.valid) {
      const user: ClientPostDTO = {
        lastname: this.signupForm.get('lastname')?.value,
        firstname: this.signupForm.get('firstname')?.value,
        phoneNumber: this.signupForm.get('phoneNumber')?.value,
        address: {
          country: this.signupForm.get('country')?.value,
          city: this.signupForm.get('city')?.value,
          street: this.signupForm.get('street')?.value,
          zipCode: this.signupForm.get('zipCode')?.value,
        },
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value
      };
      const test: ClientPostDTO = {
        lastname: "Dramé",
        firstname: "Sissako",
        phoneNumber: "0607289121",
        address: {
          country: "France",
          city: "Montmagny",
          street: "3 rue des loups",
          zipCode: "93800",
        },
        email: "sissako@email.fr",
        password: "Password123"
      };
      this.clientService.postClient(test).subscribe(value => {
        console.log("SUCCESS")
      });
    }
  }
  ngOnDestroy(): void {
  }
}
