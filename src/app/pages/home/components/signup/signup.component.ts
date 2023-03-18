import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

import * as fromApp from "../../../../../store/reducers";
import {selectRouterParams, selectRouterUrl} from 'src/store/selectors/router.selectors';
import {DOMES_BASE_PATHS} from "../../../../models/domes-url";
import {LayoutActions} from 'src/store/actions/layout.actions';


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

  constructor(private store: Store<fromApp.AppState>, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.store.select(selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.SIGNUP == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    })
  }

  ngOnDestroy(): void {
  }

  submit() {
    if(this.signupForm.valid) {
      const user = this.signupForm.value;
      console.log(user)
    }
  }
}
