import {Component, Injectable, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductsComponent {
  categories = new FormControl('');
  categoryList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  products: {
    id: String,
    description: String;
    mainPicture: String;
    secondPicture: String;
    thirdPicture: String;
    fourthPicture: String;
    category: String;
    specie: String;
    age: number;
    price: number;
    sold: boolean;
  }[] = [
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

  public constructor() {

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
}
