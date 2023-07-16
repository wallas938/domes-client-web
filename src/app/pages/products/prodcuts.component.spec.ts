import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductsComponent} from './products.component';
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {provideMockStore} from "@ngrx/store/testing";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {SharedModule} from "../../shared/shared.module";
import {GetPropertyValueByName} from "../../shared/pipes/GetPropertyValueByName";
import {Pipe, PipeTransform} from "@angular/core";
import {MatFormField} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule, By} from "@angular/platform-browser";

class MockMatBottomSheet {
  open(): void {
  }
}

@Pipe({name: 'getPropertyValueByName'})
class MockGetPropertyValueByName implements PipeTransform {
  transform(obj: any, property: string): string {
    return "obj[property]";
  }
}


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockBottomSheet: MockMatBottomSheet;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, MockGetPropertyValueByName],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        },
        {provide: MatBottomSheet, useValue: mockBottomSheet},
        {provide: MatFormField, useValue: mockBottomSheet},
      ],
      imports: [SharedModule, BrowserAnimationsModule, BrowserModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('integration tests generateCardColor()', () => {

    it('CHIEN products cards should have a brown background color class', () => {
      component.products = [{
        id: '',
        description: '',
        mainPicture: '',
        secondPicture: '',
        thirdPicture: '',
        fourthPicture: '',
        category: {
          id: '',
          name: 'CHIEN'
        },
        specie: {
          id: '',
          name: '',
        },
        price: 0,
        age: 0,
        sold: false,
      },
      ]

      fixture.detectChanges();

      const cardProduct = fixture.debugElement.query(By.css('.card'));

      const nativeElement: HTMLElement = cardProduct.nativeElement;

      expect(nativeElement.className).toContain("brown");
    });
    it('CHAT products cards should have a strong-grey background color class', () => {
      component.products = [{
        id: '',
        description: '',
        mainPicture: '',
        secondPicture: '',
        thirdPicture: '',
        fourthPicture: '',
        category: {
          id: '',
          name: 'CHAT'
        },
        specie: {
          id: '',
          name: '',
        },
        price: 0,
        age: 0,
        sold: false,
      },
      ]

      fixture.detectChanges();

      const cardProduct = fixture.debugElement.query(By.css('.card'));

      const nativeElement: HTMLElement = cardProduct.nativeElement;

      expect(nativeElement.className).toContain("strong-grey");
    });
    it('OISEAU products cards should have a grey background color class', () => {
      component.products = [{
        id: '',
        description: '',
        mainPicture: '',
        secondPicture: '',
        thirdPicture: '',
        fourthPicture: '',
        category: {
          id: '',
          name: 'OISEAU'
        },
        specie: {
          id: '',
          name: '',
        },
        price: 0,
        age: 0,
        sold: false,
      },
      ]

      fixture.detectChanges();

      const cardProduct = fixture.debugElement.query(By.css('.card'));

      const nativeElement: HTMLElement = cardProduct.nativeElement;

      expect(nativeElement.className).toContain("grey");
    });
    it('POISSON products cards should have a blue background color class', () => {
      component.products = [{
        id: '',
        description: '',
        mainPicture: '',
        secondPicture: '',
        thirdPicture: '',
        fourthPicture: '',
        category: {
          id: '',
          name: 'POISSON'
        },
        specie: {
          id: '',
          name: '',
        },
        price: 0,
        age: 0,
        sold: false,
      },
      ]

      fixture.detectChanges();

      const cardProduct = fixture.debugElement.query(By.css('.card'));

      const nativeElement: HTMLElement = cardProduct.nativeElement;

      expect(nativeElement.className).toContain("blue");
    });
    it('REPTILE products cards should have a green background color class', () => {
      component.products = [{
        id: '',
        description: '',
        mainPicture: '',
        secondPicture: '',
        thirdPicture: '',
        fourthPicture: '',
        category: {
          id: '',
          name: 'REPTILE'
        },
        specie: {
          id: '',
          name: '',
        },
        price: 0,
        age: 0,
        sold: false,
      },
      ]

      fixture.detectChanges();

      const cardProduct = fixture.debugElement.query(By.css('.card'));

      const nativeElement: HTMLElement = cardProduct.nativeElement;

      expect(nativeElement.className).toContain("green");
    });
  })
});
