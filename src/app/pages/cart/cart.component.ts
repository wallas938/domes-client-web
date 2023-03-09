import { Component } from '@angular/core';
import {Article} from "../../models/animal";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

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
}
