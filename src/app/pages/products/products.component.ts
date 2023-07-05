import {Component, Injectable, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalGetDTO} from "../../models/animal/index";
import {RouterSelectors} from "../../../store/selectors/router.selectors";
import {AnimalSelectors} from "../../../store/selectors/animal.selectors";
import {DOMES_BASE_PATHS} from "../../models/domes-url";
import {LayoutActions} from "../../../store/actions/layout.actions";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/reducers";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FilterComponent} from "./filter/filter.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AnimalActions} from "../../../store/actions/animal.action";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: AnimalGetDTO [] = [
    // {
    //   id: 'item1',
    //   description: 'This is the first item',
    //   mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
    //   secondPicture: 'https://example.com/item1-second.jpg',
    //   thirdPicture: 'https://example.com/item1-third.jpg',
    //   fourthPicture: 'https://example.com/item1-fourth.jpg',
    //   category: 'Category A',
    //   specie: 'Specie X',
    //   age: 7,
    //   price: 9.99,
    //   sold: false
    // },
    // {
    //   id: 'item2',
    //   description: 'This is the second item',
    //   mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
    //   secondPicture: 'https://example.com/item2-second.jpg',
    //   thirdPicture: 'https://example.com/item2-third.jpg',
    //   fourthPicture: 'https://example.com/item2-fourth.jpg',
    //   category: 'Category B',
    //   specie: 'Specie Y',
    //   age: 11,
    //   price: 14.99,
    //   sold: true
    // },
    // {
    //   id: 'item3',
    //   description: 'This is the third item',
    //   mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
    //   secondPicture: 'https://example.com/item3-second.jpg',
    //   thirdPicture: 'https://example.com/item3-third.jpg',
    //   fourthPicture: 'https://example.com/item3-fourth.jpg',
    //   category: 'Category C',
    //   specie: 'Specie Z',
    //   age: 4,
    //   price: 29.99,
    //   sold: false
    // },
    // {
    //   id: 'item1',
    //   description: 'This is the first item',
    //   mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
    //   secondPicture: 'https://example.com/item1-second.jpg',
    //   thirdPicture: 'https://example.com/item1-third.jpg',
    //   fourthPicture: 'https://example.com/item1-fourth.jpg',
    //   category: 'Category A',
    //   specie: 'Specie X',
    //   age: 7,
    //   price: 9.99,
    //   sold: false
    // },
    // {
    //   id: 'item2',
    //   description: 'This is the second item',
    //   mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
    //   secondPicture: 'https://example.com/item2-second.jpg',
    //   thirdPicture: 'https://example.com/item2-third.jpg',
    //   fourthPicture: 'https://example.com/item2-fourth.jpg',
    //   category: 'Category B',
    //   specie: 'Specie Y',
    //   age: 11,
    //   price: 14.99,
    //   sold: true
    // },
    // {
    //   id: 'item3',
    //   description: 'This is the third item',
    //   mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
    //   secondPicture: 'https://example.com/item3-second.jpg',
    //   thirdPicture: 'https://example.com/item3-third.jpg',
    //   fourthPicture: 'https://example.com/item3-fourth.jpg',
    //   category: 'Category C',
    //   specie: 'Specie Z',
    //   age: 4,
    //   price: 29.99,
    //   sold: false
    // },
    // {
    //   id: 'item1',
    //   description: 'This is the first item',
    //   mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
    //   secondPicture: 'https://example.com/item1-second.jpg',
    //   thirdPicture: 'https://example.com/item1-third.jpg',
    //   fourthPicture: 'https://example.com/item1-fourth.jpg',
    //   category: 'Category A',
    //   specie: 'Specie X',
    //   age: 7,
    //   price: 9.99,
    //   sold: false
    // },
    // {
    //   id: 'item2',
    //   description: 'This is the second item',
    //   mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
    //   secondPicture: 'https://example.com/item2-second.jpg',
    //   thirdPicture: 'https://example.com/item2-third.jpg',
    //   fourthPicture: 'https://example.com/item2-fourth.jpg',
    //   category: 'Category B',
    //   specie: 'Specie Y',
    //   age: 11,
    //   price: 14.99,
    //   sold: true
    // },
    // {
    //   id: 'item3',
    //   description: 'This is the third item',
    //   mainPicture: 'https://mag.bullebleue.fr/sites/mag/files/styles/breed_image_large/public/img/races/chien/berger-allemand.jpg?itok=usY0pUo2',
    //   secondPicture: 'https://example.com/item3-second.jpg',
    //   thirdPicture: 'https://example.com/item3-third.jpg',
    //   fourthPicture: 'https://example.com/item3-fourth.jpg',
    //   category: 'Category C',
    //   specie: 'Specie Z',
    //   age: 4,
    //   price: 29.99,
    //   sold: false
    // }
  ];
  currentCategoryNames: string[] = ["Labrador Retriever", "German Shepherd", "Golden Retriever", "Bulldog", "Beagle", "Poodle", "Rottweiler", "Siberian Husky", "Chihuahua", "Boxer", "Dachshund", "Shih Tzu", "Doberman Pinscher", "Australian Shepherd", "Border Collie", "Great Dane", "Jack Russell Terrier", "Bichon Frise", "Cocker Spaniel", "Yorkshire Terrier"];
  loading = false;
  batch = 0;
  isFirstDataLoading: boolean = true;
  noPictureImgSrc = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'

  public constructor(private router: Router,
                     private route: ActivatedRoute,
                     private store: Store<fromApp.AppState>,
                     private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {

    this.store.select(AnimalSelectors.selectIsFirstDataLoading).subscribe(value => {
      this.isFirstDataLoading = value;
      if (this.isFirstDataLoading) {
        this.store.dispatch(AnimalActions.GetAnimalsStart({batch: this.batch}));
      }
    })

    this.store.select(AnimalSelectors.selectAnimals).subscribe((value) => {
      this.products = value;
    });

    this.store.select(AnimalSelectors.selectBatch).subscribe(value => {
      this.batch = value;
    });

    this.store.select(AnimalSelectors.selectLoading).subscribe(value => {
      this.loading = value;
    });

    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.PRODUCTS == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    })
  }

  ngOnDestroy(): void {
  }

  async onScroll() {
    this.store.dispatch(AnimalActions.GetAnimalsStart({batch: this.batch}));
  }

  openFilter() {
    this._bottomSheet.open(FilterComponent, {
      data: {currentCategoryNames: this.currentCategoryNames}
    });
  }

  generateCardColor(categoryName: string) {
    switch (categoryName) {
      case "CHIEN":
        return "product brown";
      case "CHAT":
        return "product strong-grey";
      case "OISEAU":
        return "product grey";
      case "POISSON":
        return "product blue";
      case "REPTILE":
        return "product green";
      default:
        return "strong-grey"
    }
  }


  generateInfoColor(categoryName: string) {
    switch (categoryName) {
      case "CHIEN":
        return "info brown-info";
      case "CHAT":
        return "info strong-grey-info";
      case "OISEAU":
        return "info grey-info";
      case "POISSON":
        return "info blue-info";
      case "REPTILE":
        return "info green-info";
      default:
        return "info strong-grey-info"
    }
  }

  showDetail(id: String) {
    if (id) this.router.navigate([id], {relativeTo: this.route})
  }
}
