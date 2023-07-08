import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../../store/reducers";
import {AnimalSelectors} from "../../../../store/selectors/animal.selectors";
import {AnimalGetDTO} from "../../../models/animal";
import {Observable, of} from "rxjs";
import {CartActions} from "../../../../store/actions/cart.action";
import {CartSelectors} from "../../../../store/selectors/cart.selectors";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  noPictureImgSrc = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'
  currentAnimal: AnimalGetDTO = {} as AnimalGetDTO;
  cart: AnimalGetDTO[] = [];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {

    this.store.select(CartSelectors.selectCart).subscribe(value => this.cart = value);

    this.store.select(AnimalSelectors.selectAnimal).subscribe(value => {
      !value.specie && this.router.navigate(['/products']);
      this.currentAnimal = value
    })
  }

  addToCart(product: AnimalGetDTO) {
    this.store.dispatch(CartActions.AddToCart({animal: product}))
    this.router.navigate(['/products']).then()
  }


  isAlreadyAdded(id: string): boolean {
    return !!this.cart.find(value => value.id === id);
  }
}
