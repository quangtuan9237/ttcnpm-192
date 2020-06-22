import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCouponFormComponent } from './manage-coupon-form.component';

describe('ManageCouponFormComponent', () => {
  let component: ManageCouponFormComponent;
  let fixture: ComponentFixture<ManageCouponFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCouponFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCouponFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
