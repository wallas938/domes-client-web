import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
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
  open(): void {}
}
@Pipe({ name: 'getPropertyValueByName' })
class MockGetPropertyValueByName implements PipeTransform  {
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
      declarations: [ ProductsComponent, MockGetPropertyValueByName ],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        },
        { provide: MatBottomSheet, useValue: mockBottomSheet },
        { provide: MatFormField, useValue: mockBottomSheet },
      ],
      imports: [SharedModule, BrowserAnimationsModule, BrowserModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('generateCardColor()', () => {

    it('should returns "product brown" when calls with "CHIEN" parameter', () => {
      const result = component.generateCardColor("CHIEN");
      expect(result).toBe("product brown")
    });

    it('should returns "product strong-grey" when calls with "CHAT" parameter', () => {
      const result = component.generateCardColor("CHAT");
      expect(result).toBe("product strong-grey")
    });

    it('should returns "product grey" when calls with "OISEAU" parameter', () => {
      const result = component.generateCardColor("OISEAU");
      expect(result).toBe("product grey")
    });

    it('should returns "product blue" when calls with "POISSON" parameter', () => {
      const result = component.generateCardColor("POISSON");
      expect(result).toBe("product blue")
    });

    it('should returns "product green" when calls with "REPTILE" parameter', () => {
      const result = component.generateCardColor("REPTILE");
      expect(result).toBe("product green")
    });
  });
});
