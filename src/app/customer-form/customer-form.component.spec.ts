import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerFormCountryComponent } from './components/customer-form-country/customer-form-country.component';

import { CustomerFormComponent } from './customer-form.component';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerFormComponent, CustomerFormCountryComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatStepperModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid email', () => {
    component.customerDetails.setValue({
      name: '',
      email: 'invalid',
      tel: null,
      entity: '',
      isClientVatPayer: false,
    });
    expect(component.customerDetails.valid).toEqual(false);
  });
  it('should be valid of form value is valid', () => {
    component.serviceProviderDetails.setValue({
      companyName: 'MSI',
      companyRegion: 'Europe',
      companyCountry: 'Latvia',
      isCompanyVatPayer: true,
    });
    expect(component.serviceProviderDetails.valid).toEqual(true);
  });
});
