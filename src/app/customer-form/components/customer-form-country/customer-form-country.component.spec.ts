import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomerFormCountryComponent } from './customer-form-country.component';

describe('CustomerFormCountryComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let component: CustomerFormCountryComponent;
  let fixture: ComponentFixture<CustomerFormCountryComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CustomerFormCountryComponent, TestHostComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CustomerFormCountryComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(Component).toBeTruthy();
  });

  it('should toggle isLoading boolean', () => {
    expect(component.isLoading).toBeFalsy();
    component.getCountries('Africa');
    expect(component.isLoading).toBeTruthy();
  });

  it('should correctly render the passed @Input value', () => {
    testHostComponent.customerAddressForm.patchValue({
      region: 'Europe',
    });
    testHostFixture.detectChanges();
    const compiled = testHostFixture.nativeElement;
    expect(compiled.querySelector('div').textContent).toContain('Europe');
  });

  it('should show Region', () => {
    expect(
      testHostFixture.nativeElement.querySelector('div').innerText
    ).toEqual('Region');
  });

  @Component({
    selector: `host-component`,
    template: `
      <app-customer-form-country
        [form]="customerAddressForm"
        [region]="'region'"
        [country]="'country'"
      ></app-customer-form-country>
    `,
  })
  class TestHostComponent {
    constructor(private fb: FormBuilder) {}

    customerAddressForm = this.fb.nonNullable.group({
      region: new FormControl(),
      country: new FormControl(),
    });
  }
});
