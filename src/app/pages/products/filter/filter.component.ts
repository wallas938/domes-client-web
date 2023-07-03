import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FormControl} from "@angular/forms";
import {Category} from "../../../models/category";

enum Price {
  "ALL" = "ALL",
  "50_To_200" = "50_To_200",
  "200_To_400" = "200_To_400",
  "400_To_600" = "400_To_600",
  "600_To_800" = "600_To_800",
  "800_To_999" = "800_To_999",
}

enum Age {
  "ALL" = "ALL",
  "1_To_3" = "1_To_3",
  "3_To_5" = "3_To_5",
  "5_To_7" = "5_To_7",
  "7_To_9" = "7_To_9",
  "9_To_12" = "9_To_12",
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  Category = Category
  specie = new FormControl("");
  selectedPrice: Price = Price['ALL'];
  selectedAge: Age = Age['ALL'];
  prices: any = [
    {label: "Tous les prix", value: Price['ALL']},
    {label: 'Jusqu’à 200 EUR', value: Price["50_To_200"]},
    {label: '200 à 400 EUR', value: Price["200_To_400"]},
    {label: '400 à 600 EUR', value: Price["400_To_600"]},
    {label: '600 à 800 EUR', value: Price["600_To_800"]},
    {label: '800 à 999 EUR', value: Price["800_To_999"]},
  ];
  ages: any = [
    {label: "Tous les age", value: Price['ALL']},
    {label: 'Jusqu’a 3 mois', value: Age['1_To_3']},
    {label: '3 à 5 mois', value: Age['3_To_5']},
    {label: '5 à 7 mois', value: Age['5_To_7']},
    {label: '7 à 9 mois', value: Age['7_To_9']},
    {label: '9 à 12 mois', value: Age['9_To_12']},
  ];
  category: Category = Category.CAT

  constructor(private _bottomSheetRef: MatBottomSheetRef<FilterComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
    currentCategoryNames: string[]
  }) {
  }

  updateCategory(category: Category) {
    this.category = category
  }

  updatePrice(price: Price) {
    this.selectedPrice = price
  }

  updateAge(age: Age) {
    this.selectedAge = age
  }

  ngOnInit(): void {
    this.specie.setValue(this.data.currentCategoryNames[0]);
    this.specie.valueChanges.subscribe(value => console.log(value));
  }

  submit() {
    console.log({
      category: this.category,
      specie: this.specie.value,
      priceRange: this.selectedPrice,
      ageRange: this.selectedAge,
    });
    this._bottomSheetRef.dismiss();
  }

  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
