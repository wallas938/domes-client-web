import {Component, OnDestroy, OnInit} from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

/*
* Custom imports
* */

import {AnimalGetDTO, Article} from "../../models/animal";
import {SECTION_NAMES} from "../../constants";
import {RouterSelectors} from "../../../store/selectors/router.selectors";
import {DOMES_BASE_PATHS} from "../../models/domes-url";
import {LayoutActions} from "../../../store/actions/layout.actions";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {CartSelectors} from "../../../store/selectors/cart.selectors";
import {FormBuilder, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../home/components/signup/signup.component";
import {CartActions} from "../../../store/actions/cart.action";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-100px)'}),
        animate('.4s', style({opacity: 1, transform: 'translateY(0px)'})),
      ]),
      transition(':leave', [
        animate('.4s', style({opacity: 0, transform: 'translateY(-100px)'}))
      ])
    ]),
    trigger('rotate180deg', [
      // ...
      state('up', style({
        transform: 'rotateZ(0deg)'
      })),
      state('down', style({
        transform: 'rotateZ(180deg)'
      })),
      transition('up => down', [
        animate('.3s')
      ]),
      transition('down => up', [
        animate('.3s')
      ]),
    ]),
  ]
})
export class CartComponent implements OnInit, OnDestroy {
  SECTION_NAMES = SECTION_NAMES;

  sectionStates = {
    resume: true,
    shippingInfo: true,
    payment: true
  }

  cart: AnimalGetDTO[] = [
    // {
    //   id: '0d7fdd41-2402-4897-9978-6f49f19ce4e1',
    //   description: 'CHIEN/Teckel/11 months',
    //   mainPicture: 'https://www.akc.org/wp-content/themes/akc/component-library/assets/img/welcome.jpg',
    //   secondPicture: '',
    //   thirdPicture: '',
    //   fourthPicture: '',
    //   category: {
    //     id: '24ce8652-33a2-418e-89c5-630a89a782ab',
    //     name: 'CHIEN'
    //   },
    //   specie: {
    //     id: '373ce6a4-8a41-4474-9819-a864267e2919',
    //     name: 'Teckel',
    //   },
    //   price: 265,
    //   age: 11,
    //   sold: false,
    // },
    // {
    //   id: '5c47631f-4317-4272-b6a0-f639b6451c4e',
    //   description: 'CHIEN/Staffordshire bull terrier/16 months',
    //   mainPicture: 'https://www.akc.org/wp-content/themes/akc/component-library/assets/img/welcome.jpg',
    //   secondPicture: '',
    //   thirdPicture: '',
    //   fourthPicture: '',
    //   category: {
    //     id: '24ce8652-33a2-418e-89c5-630a89a782ab',
    //     name: 'CHIEN'
    //   },
    //   specie: {
    //     id: '09ec6b9e-ea28-4123-a863-8d7305ca2cf9',
    //     name: 'Staffordshire bull terrier',
    //   },
    //   price: 886,
    //   age: 16,
    //   sold: false,
    // },
  ]

  months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  years: string[] = ["2032", "2031", "2030", "2029", "2028", "2027", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012"];

  shippingInfoForm = this.fb.group({
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))]],
    country: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    zipCode: ['', Validators.required],
  });

  paymentInfoForm = this.fb.group({
    cardNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    lastname: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    expirationDate: ['', Validators.required],
  });

  constructor(private store: Store<fromApp.AppState>, private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.store.select(CartSelectors.selectCart).subscribe(value => this.cart = value);

    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.CART == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    })
  }

  ngOnDestroy(): void {
  }

  toggleSection(section: string) {
    switch (section) {
      case SECTION_NAMES.RESUME: {
        this.sectionStates.resume = !this.sectionStates.resume;
        break;
      }
      case SECTION_NAMES.SHIPPING_INFO: {
        this.sectionStates.shippingInfo = !this.sectionStates.shippingInfo;
        break;
      }
      case SECTION_NAMES.PAYMENT: {
        this.sectionStates.payment = !this.sectionStates.payment;
        break;
      }
    }
  }

  removeFromCart(id: string) {
    this.store.dispatch(CartActions.RemoveFromCart({id}));
  }

  getTotal(): number {
    if (this.cart.length > 0)
      return this.cart.map(value => value.price).reduce((a, b) => a + b);
    return 0;
  }
}
