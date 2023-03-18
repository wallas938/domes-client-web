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

import {Article} from "../../models/animal";
import {SECTION_NAMES} from "src/app/constants/index";
import {selectRouterUrl} from "../../../store/selectors/router.selectors";
import {DOMES_BASE_PATHS} from "../../models/domes-url";
import {LayoutActions} from "../../../store/actions/layout.actions";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";

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

  sectionStates = {
    resume: true,
    shippingInfo: true,
    payment: true
  }

  SECTION_NAMES = SECTION_NAMES;
  articles: Article[] = [
    {
      id: '0b016d38-c176-4065-8f3e-d754a3c3876d',
      specie: 'Specie X',
      age: 7,
      price: 9.99,
    },
    {
      id: '0b016d38-c176-4065-8f3e-d754a3c3876d',
      specie: 'Specie X',
      age: 7,
      price: 9.99,
    },
    {
      id: '0b016d38-c176-4065-8f3e-d754a3c3876d',
      specie: 'Specie X',
      age: 7,
      price: 9.99,
    },
  ]
  months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  years: string[] = ["2032", "2031", "2030", "2029", "2028", "2027", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012"];


  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.select(selectRouterUrl).subscribe(value => {
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
}
