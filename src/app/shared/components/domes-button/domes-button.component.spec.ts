import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesButtonComponent } from './domes-button.component';

describe('DomesButtonComponent', () => {
  let component: DomesButtonComponent;
  let fixture: ComponentFixture<DomesButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomesButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
