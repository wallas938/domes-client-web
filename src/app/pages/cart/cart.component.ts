import {Component} from '@angular/core';
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
  months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  years: string[] = ["2032", "2031", "2030", "2029", "2028", "2027", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012"];
}
