import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FormControl} from "@angular/forms";
import {CategoryName} from "../../../models/animal/category";
import {AnimalSearchQuery, Category, Specie} from "../../../models/animal";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../../store/reducers";
import {AnimalSelectors} from "../../../../store/selectors/animal.selectors";
import {AnimalActions} from "../../../../store/actions/animal.action";
import {Observable} from "rxjs";

enum Price {
  "ALL" = "ALL",
  "50_100" = "50_100",
  "100_200" = "100_200",
  "200_300" = "200_300",
  "300_400" = "300_400",
  "400_500" = "400_500",
  "500_600" = "500_600",
  "600_700" = "600_700",
  "700_800" = "700_800",
  "800_900" = "800_900",
  "900_999" = "900_999",
}

enum Age {
  "ALL" = "ALL",
  "1_3" = "1_3",
  "3_5" = "3_5",
  "5_7" = "5_7",
  "7_9" = "7_9",
  "9_12" = "9_12",
  "12_15" = "12_15",
  "15_17" = "15_17",
  "17_19" = "17_19",
  "19_21" = "19_21",
  "21_24" = "21_24",
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  CategoryName = CategoryName
  specie = new FormControl<Specie>({} as Specie);
  selectedPrice: Price = Price['ALL'];
  selectedAge: Age = Age['ALL'];
  minAge: number = 1;
  maxAge: number = 24;
  minPrice: number = 50;
  maxPrice: number = 999;
  prices: any = [
    {label: "Tous les prix", value: Price['ALL']},
    {label: 'Jusqu’à 100 EUR', value: Price["50_100"]},
    {label: '100 à 200 EUR', value: Price["100_200"]},
    {label: '200 à 300 EUR', value: Price["200_300"]},
    {label: '300 à 400 EUR', value: Price["300_400"]},
    {label: '400 à 500 EUR', value: Price["400_500"]},
    {label: '500 à 600EUR', value: Price["500_600"]},
    {label: '600 à 700 EUR', value: Price["600_700"]},
    {label: '700 à 800 EUR', value: Price["700_800"]},
    {label: '800 à 900 EUR', value: Price["800_900"]},
    {label: '900 à 999 EUR', value: Price["900_999"]},
  ];
  ages: any = [
    {label: "Tous les age", value: Price['ALL']},
    {label: 'Jusqu’a 3 mois', value: Age['1_3']},
    {label: '3 à 5 mois', value: Age['3_5']},
    {label: '5 à 7 mois', value: Age['5_7']},
    {label: '7 à 9 mois', value: Age['7_9']},
    {label: '9 à 12 mois', value: Age['9_12']},
    {label: '12 à 15 mois', value: Age['12_15']},
    {label: '15 à 17 mois', value: Age['15_17']},
    {label: '17 à 19 mois', value: Age['17_19']},
    {label: '19 à 21 mois', value: Age['19_21']},
    {label: '21 à 24 mois', value: Age['21_24']},
  ];
  category!: Category;
  pageNumber!: number;
  currentSpecies!: Specie[];

  constructor(
    private store: Store<fromApp.AppState>,
    private _bottomSheetRef: MatBottomSheetRef<FilterComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      categories: Category[],
      species: Specie[]
    }) {
  }

  ngOnInit(): void {
    this.specie.setValue({id: 'ALL', name: 'ALL'})
    this.category = {id: 'ALL', name: 'ALL'};
    this.store.select(AnimalSelectors.selectSpecies).subscribe(value => {
      this.currentSpecies = value;
    });
    this.store.select(AnimalSelectors.selectPageNumber).subscribe(value => this.pageNumber = value);
  }

  updateCategory(category: Category) {
    this.category = category
    this.onCategory();
  }

  updatePrice(price: Price) {
    this.selectedPrice = price;
    this.convertSelectedPrice();
  }

  updateAge(age: Age) {
    this.selectedAge = age;
    this.convertSelectedAge();
  }

  generateButtonStyle(categoryName: string) {
    switch (categoryName) {
      case "CHIEN":
        return this.category.name === "CHIEN" ? 'active brown' : '';
      case "CHAT":
        return this.category.name === "CHAT" ? 'active strong-grey' : '';
      case "OISEAU":
        return this.category.name === "OISEAU" ? 'active grey' : '';
      case "POISSON":
        return this.category.name === "POISSON" ? 'active blue' : '';
      case "REPTILE":
        return this.category.name === "REPTILE" ? 'active green' : '';
      case "ALL":
        return this.category.name === "ALL" ? 'active orange' : '';
      default:
        return ''
    }
  }

  submit() {
    const filter: AnimalSearchQuery = {
      minAge: this.minAge,
      maxAge: this.maxAge,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      pageNumber: this.pageNumber,
      category: this.category,
      pageSize: 10,
      specie: this.convertSelectedSpecie()
    }

    this.store.dispatch(AnimalActions.GetAnimalsStart({pageNumber: this.pageNumber}));

    this._bottomSheetRef.dismiss();
  }

  convertSelectedSpecie() {
    return this.specie.value && this.specie.value?.name !== "ALL" ? this.specie.value : {name: "", id: ""} as Specie
  }

  convertSelectedAge() {
    switch (this.selectedAge) {
      case Age.ALL:
        this.minAge = 1;
        this.maxAge = 24;
        break;
      case Age["1_3"]:
        this.minAge = 1;
        this.maxAge = 3;
        break;
      case Age["3_5"]:
        this.minAge = 3;
        this.maxAge = 5;
        break;
      case Age["5_7"]:
        this.minAge = 5;
        this.maxAge = 7;
        break;
      case Age["7_9"]:
        this.minAge = 7;
        this.maxAge = 9;
        break;
      case Age["9_12"]:
        this.minAge = 9;
        this.maxAge = 12;
        break;
      case Age["12_15"]:
        this.minAge = 12;
        this.maxAge = 15;
        break;
      case Age["15_17"]:
        this.minAge = 15;
        this.maxAge = 17;
        break;
      case Age["17_19"]:
        this.minAge = 17;
        this.maxAge = 19;
        break;
      case Age["19_21"]:
        this.minAge = 19;
        this.maxAge = 21;
        break;
      case Age["21_24"]:
        this.minAge = 21;
        this.maxAge = 24;
        break;
    }
  }

  convertSelectedPrice() {
    switch (this.selectedPrice) {
      case Price.ALL:
        this.minPrice = 50;
        this.maxPrice = 999;
        break;
      case Price["50_100"]:
        this.minPrice = 50;
        this.maxPrice = 100;
        break;
      case Price["100_200"]:
        this.minPrice = 100;
        this.maxPrice = 200;
        break;
      case Price["200_300"]:
        this.minPrice = 200;
        this.maxPrice = 300;
        break;
      case Price["300_400"]:
        this.minPrice = 300;
        this.maxPrice = 400;
        break;
      case Price["400_500"]:
        this.minPrice = 400;
        this.maxPrice = 500;
        break;
      case Price["500_600"]:
        this.minPrice = 500;
        this.maxPrice = 600;
        break;
      case Price["600_700"]:
        this.minPrice = 600;
        this.maxPrice = 700;
        break;
      case Price["700_800"]:
        this.minPrice = 700;
        this.maxPrice = 800;
        break;
      case Price["800_900"]:
        this.minPrice = 800;
        this.maxPrice = 900;
        break;
      case Price["900_999"]:
        this.minPrice = 900;
        this.maxPrice = 999;
        break;
    }
  }

  onCategory() {
    this.store.dispatch(AnimalActions.GetSpeciesByCategoryStart({category: this.category}))
  }

  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
