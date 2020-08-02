import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartSnackBarComponent } from './shopping-cart-snack-bar.component';

describe('ShoppingCartSnackBarComponent', () => {
  let component: ShoppingCartSnackBarComponent;
  let fixture: ComponentFixture<ShoppingCartSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
