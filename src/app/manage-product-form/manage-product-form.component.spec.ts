import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductFormComponent } from './manage-product-form.component';

describe('ManageProductFormComponent', () => {
  let component: ManageProductFormComponent;
  let fixture: ComponentFixture<ManageProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
