import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{
  category = new FormControl("");

  constructor(private _bottomSheetRef: MatBottomSheetRef<FilterComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: {currentCategoryNames: string[]}) {
  }


  ngOnInit(): void {
    console.log(this.data.currentCategoryNames)
  }

  updateCategory() {}

  close(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
