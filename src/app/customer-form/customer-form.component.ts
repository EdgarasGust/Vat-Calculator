import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormDetailsComponent } from './customer-form-details/customer-form-details.component';
import { CustomerData } from './interfaces/customerData';
import { CountriesApiService } from './services/countries-api.service';
import { VatCalculatorService } from './services/vat-calculator.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent {
  customerDetails = this.fb.nonNullable.group({
    name: '',
    email: '',
    tel: null,
    entity: '',
    isClientVatPayer: false,
  });
  customerAddress = this.fb.nonNullable.group({
    region: '',
    country: '',
  });
  serviceProviderDetails = this.fb.nonNullable.group({
    companyName: '',
    companyRegion: '',
    companyCountry: '',
    isCompanyVatPayer: false,
  });
  serviceProvided = this.fb.nonNullable.group({
    service: '',
    price: null,
    vat: null,
  });

  constructor(
    private countriesApiServices: CountriesApiService,
    private vatCalcService: VatCalculatorService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  openDialog(customerData: CustomerData) {
    this.dialog.open(CustomerFormDetailsComponent, {
      data: { ...customerData },
    });
  }

  onFormDataSubmitted() {
    const formDetails = {
      name: this.customerDetails.value.name,
      email: this.customerDetails.value.email,
      tel: this.customerDetails.value.tel,
      entity: this.customerDetails.value.entity,
      isClientVatPayer: this.customerDetails.value.isClientVatPayer,
      region: this.customerAddress.value.region,
      country: this.customerAddress.controls.country.value,
      companyName: this.serviceProviderDetails.value.companyName,
      companyRegion: this.serviceProviderDetails.value.companyRegion,
      companyCountry: this.serviceProviderDetails.value.companyCountry,
      isCompanyVatPayer: this.serviceProviderDetails.value.isCompanyVatPayer,
      service: this.serviceProvided.value.service,
      price: this.serviceProvided.value.price,
      vat: this.serviceProvided.value.vat,
    };

    const updatedFormDetails = this.vatCalcService.calculateVat(formDetails);
    this.openDialog(updatedFormDetails);
  }

  onSubmit() {
    // if (
    //   !this.customerDetails.invalid ||
    //   !this.customerAddress.invalid ||
    //   !this.serviceProviderDetails.invalid ||
    //   !this.serviceProvided.invalid
    // ) {
    //   this.onFormDataSubmitted();
    // } else {
    //   console.error('Form is not valid');
    // }
    this.onFormDataSubmitted();

    this.customerDetails.reset();
    this.customerAddress.reset();
    this.serviceProviderDetails.reset();
    this.serviceProvided.reset();
  }
}
