import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CustomerFormDetailsComponent } from './customer-form-details/customer-form-details.component';
import { CustomerData } from './interfaces/customerData';
import { VatCalculatorService } from './services/vat-calculator.service';

@Component({
  selector: 'app-customer-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private vatCalcService: VatCalculatorService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  openDialog(customerData: CustomerData) {
    const dialogRef = this.dialog.open(CustomerFormDetailsComponent, {
      data: { customerData },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/home']);
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
    if (
      !this.customerDetails.invalid ||
      !this.customerAddress.invalid ||
      !this.serviceProviderDetails.invalid ||
      !this.serviceProvided.invalid
    ) {
      this.onFormDataSubmitted();
    } else {
      console.error('Form is not valid');
    }

    this.customerDetails.reset();
    this.customerAddress.reset();
    this.serviceProviderDetails.reset();
    this.serviceProvided.reset();
  }
}
