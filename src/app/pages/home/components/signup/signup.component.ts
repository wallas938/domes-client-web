import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

import * as fromApp from "../../../../../store/reducers";
import {RouterSelectors} from 'src/store/selectors/router.selectors';
import {AuthenticationSelectors} from 'src/store/selectors/authentication.selectors';
import {ClientSelectors} from 'src/store/selectors/client.selectors';
import {DOMES_BASE_PATHS} from "../../../../models/domes-url";
import {LayoutActions} from 'src/store/actions/layout.actions';
import {ClientGetDTO, ClientPostDTO} from "../../../../models/client";
import {ClientService} from "../../../../services/client/client.service";
import {ClientActions} from "../../../../../store/actions/client.actions";
import {Router} from "@angular/router";


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

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              private clientService: ClientService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.SIGNUP == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    });
  }

  submit() {
    // if (this.signupForm.valid) { to uncomment
    const user: ClientPostDTO = {
      lastname: this.signupForm.get('lastname')!.value!.toLowerCase(),
      firstname: this.signupForm.get('firstname')!.value!.toLowerCase(),
      phoneNumber: this.signupForm.get('phoneNumber')!.value!.toLowerCase(),
      address: {
        country: this.signupForm.get('country')!.value!.toLowerCase(),
        city: this.signupForm.get('city')!.value!.toLowerCase(),
        street: this.signupForm.get('street')!.value!.toLowerCase(),
        zipCode: this.signupForm.get('zipCode')!.value!.toLowerCase(),
      },
      email: this.signupForm.get('email')!.value!.toLowerCase(),
      password: this.signupForm.get('password')!.value!.toLowerCase()
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
    this.store.dispatch(ClientActions.PostClientStart({clientPostDTO: test}));
    this.router.navigate(['home#home']).then(value => {})
    // } to uncomment
  }

  ngOnDestroy(): void {
  }
}
