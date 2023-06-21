import {Component, Injectable, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Animal} from "../../models/animal";
import {RouterSelectors} from "../../../store/selectors/router.selectors";
import {DOMES_BASE_PATHS} from "../../models/domes-url";
import {LayoutActions} from "../../../store/actions/layout.actions";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FilterComponent} from "./filter/filter.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductsComponent implements OnInit, OnDestroy {
  categories = new FormControl('');
  categoryList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  products: Animal [] = [
    {
      id: 'item1',
      description: 'This is the first item',
      mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
      secondPicture: 'https://example.com/item1-second.jpg',
      thirdPicture: 'https://example.com/item1-third.jpg',
      fourthPicture: 'https://example.com/item1-fourth.jpg',
      category: 'Category A',
      specie: 'Specie X',
      age: 7,
      price: 9.99,
      sold: false
    },
    {
      id: 'item2',
      description: 'This is the second item',
      mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
      secondPicture: 'https://example.com/item2-second.jpg',
      thirdPicture: 'https://example.com/item2-third.jpg',
      fourthPicture: 'https://example.com/item2-fourth.jpg',
      category: 'Category B',
      specie: 'Specie Y',
      age: 11,
      price: 14.99,
      sold: true
    },
    {
      id: 'item3',
      description: 'This is the third item',
      mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
      secondPicture: 'https://example.com/item3-second.jpg',
      thirdPicture: 'https://example.com/item3-third.jpg',
      fourthPicture: 'https://example.com/item3-fourth.jpg',
      category: 'Category C',
      specie: 'Specie Z',
      age: 4,
      price: 29.99,
      sold: false
    },
    {
      id: 'item1',
      description: 'This is the first item',
      mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
      secondPicture: 'https://example.com/item1-second.jpg',
      thirdPicture: 'https://example.com/item1-third.jpg',
      fourthPicture: 'https://example.com/item1-fourth.jpg',
      category: 'Category A',
      specie: 'Specie X',
      age: 7,
      price: 9.99,
      sold: false
    },
    {
      id: 'item2',
      description: 'This is the second item',
      mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
      secondPicture: 'https://example.com/item2-second.jpg',
      thirdPicture: 'https://example.com/item2-third.jpg',
      fourthPicture: 'https://example.com/item2-fourth.jpg',
      category: 'Category B',
      specie: 'Specie Y',
      age: 11,
      price: 14.99,
      sold: true
    },
    {
      id: 'item3',
      description: 'This is the third item',
      mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
      secondPicture: 'https://example.com/item3-second.jpg',
      thirdPicture: 'https://example.com/item3-third.jpg',
      fourthPicture: 'https://example.com/item3-fourth.jpg',
      category: 'Category C',
      specie: 'Specie Z',
      age: 4,
      price: 29.99,
      sold: false
    },
    {
      id: 'item1',
      description: 'This is the first item',
      mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
      secondPicture: 'https://example.com/item1-second.jpg',
      thirdPicture: 'https://example.com/item1-third.jpg',
      fourthPicture: 'https://example.com/item1-fourth.jpg',
      category: 'Category A',
      specie: 'Specie X',
      age: 7,
      price: 9.99,
      sold: false
    },
    {
      id: 'item2',
      description: 'This is the second item',
      mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
      secondPicture: 'https://example.com/item2-second.jpg',
      thirdPicture: 'https://example.com/item2-third.jpg',
      fourthPicture: 'https://example.com/item2-fourth.jpg',
      category: 'Category B',
      specie: 'Specie Y',
      age: 11,
      price: 14.99,
      sold: true
    },
    {
      id: 'item3',
      description: 'This is the third item',
      mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
      secondPicture: 'https://example.com/item3-second.jpg',
      thirdPicture: 'https://example.com/item3-third.jpg',
      fourthPicture: 'https://example.com/item3-fourth.jpg',
      category: 'Category C',
      specie: 'Specie Z',
      age: 4,
      price: 29.99,
      sold: false
    }
  ];
  currentCategoryNames: string[] = ["Labrador Retriever", "German Shepherd", "Golden Retriever", "Bulldog", "Beagle", "Poodle", "Rottweiler", "Siberian Husky", "Chihuahua", "Boxer", "Dachshund", "Shih Tzu", "Doberman Pinscher", "Australian Shepherd", "Border Collie", "Great Dane", "Jack Russell Terrier", "Bichon Frise", "Cocker Spaniel", "Yorkshire Terrier"];
  length = 50;
  pageSize = 15;
  pageIndex = 0;
  pageSizeOptions = [15, 25, 50];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent = new PageEvent();

  public constructor(private router: Router,
                     private route: ActivatedRoute,
                     private store: Store<fromApp.AppState>,
                     private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.PRODUCTS == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    })
  }

  ngOnDestroy(): void {
  }

  openFilter() {
    this._bottomSheet.open(FilterComponent, {
      data: {currentCategoryNames: this.currentCategoryNames}
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  showDetail(id: String) {
    if (id) this.router.navigate([id], {relativeTo: this.route})
  }
}
