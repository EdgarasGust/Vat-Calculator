import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormCountryComponent } from './customer-form-country.component';

describe('CustomerFormCountryComponent', () => {
  let component: CustomerFormCountryComponent;
  let fixture: ComponentFixture<CustomerFormCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFormCountryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFormCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
