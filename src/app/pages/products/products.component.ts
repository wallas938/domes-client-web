import {Component, Injectable, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalGetDTO, AnimalSearchQuery, Category, Specie} from "../../models/animal/index";
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
import {FormControl} from "@angular/forms";
import {CartActions} from "../../../store/actions/cart.action";
import {CartSelectors} from "../../../store/selectors/cart.selectors";

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
  products: AnimalGetDTO [] = [];
  currentSpecieNames: string[] = [
    // "Labrador Retriever", "German Shepherd", "Golden Retriever", "Bulldog", "Beagle", "Poodle", "Rottweiler", "Siberian Husky", "Chihuahua", "Boxer", "Dachshund", "Shih Tzu", "Doberman Pinscher", "Australian Shepherd", "Border Collie", "Great Dane", "Jack Russell Terrier", "Bichon Frise", "Cocker Spaniel", "Yorkshire Terrier"
  ];
  categories: Category[] = [];
  species: Specie[] = [];
  loading = false;
  pageNumber = 0;
  isFirstDataLoading: boolean = true;
  noPictureImgSrc = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'
  searchValue: string = '';
  isSearchValueChange: boolean = false;
  searchFormControl: FormControl = new FormControl('');
  cart: AnimalGetDTO[] = [];
  public constructor(private router: Router,
                     private route: ActivatedRoute,
                     private store: Store<fromApp.AppState>,
                     private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.store.dispatch(AnimalActions.GetSpeciesStart());

    this.store.select(CartSelectors.selectCart).subscribe(value => this.cart = value);

    this.store.select(AnimalSelectors.selectSearchValue).subscribe((value) => {
      this.searchValue = value;
    });

    this.store.select(AnimalSelectors.selectIsSearchValueChange).subscribe((value) => {
      this.isSearchValueChange = value;
    });

    this.store.select(AnimalSelectors.selectAnimals).subscribe((value) => {
      this.products = value;
    });

    this.store.select(AnimalSelectors.selectPageNumber).subscribe(value => {
      this.pageNumber = value;
    });

    this.store.select(AnimalSelectors.selectLoading).subscribe(value => {
      this.loading = value;
    });

    this.store.select(AnimalSelectors.selectCategories).subscribe(value => this.categories = value);

    this.store.select(AnimalSelectors.selectSpecies).subscribe(value => {
      this.species = value;
      this.currentSpecieNames = value.map(s => s.name).filter((value1, index) => index <= 100);
    });

    this.store.select(AnimalSelectors.selectIsFirstDataLoading).subscribe(value => {
      this.isFirstDataLoading = value;
      if (this.isFirstDataLoading) {
        this.store.dispatch(AnimalActions.GetAnimalsStart({
          pageNumber: this.pageNumber
        }));
        this.store.dispatch(AnimalActions.GetCategoriesStart());
        this.store.dispatch(AnimalActions.ResetPageNumber())
      }
    });

    this.store.select(RouterSelectors.selectRouterUrl).subscribe(value => {
      if (DOMES_BASE_PATHS.PRODUCTS == value) this.store.dispatch(LayoutActions.MobileMenuClosed());
    });
  }

  ngOnDestroy(): void {
  }

  onScroll() {
    this.store.dispatch(AnimalActions.GetAnimalsStart({
      pageNumber: this.pageNumber,
    }));
  }

  openFilter() {
    this._bottomSheet.open(FilterComponent, {
      data: {categories: this.categories, species: this.species}
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

  showDetail(id: string) {

    this.store.dispatch(AnimalActions.GetCurrentAnimal({id}))

    if (id) this.router.navigate([id], {relativeTo: this.route}).then()
  }

  addToCart(product: AnimalGetDTO) {
    this.store.dispatch(CartActions.AddToCart({animal: product}))
  }

  isAlreadyAdded(id: string): boolean {
    return !!this.cart.find(value => value.id === id);
  }
}
