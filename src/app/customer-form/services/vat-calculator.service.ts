import { Injectable } from '@angular/core';
import { Region } from '../interfaces/countries';
import { CustomerData } from '../interfaces/customerData';

@Injectable({
  providedIn: 'root',
})
export class VatCalculatorService {
  private updatedCustomerData: CustomerData;

  constructor() {}

  calculateVat(data: CustomerData) {
    let vat: number | null | undefined;

    if (data.region !== Region.europe || !data.isCompanyVatPayer) {
      vat = 0;
      // 'Not Europe'
    } else if (
      data.region === Region.europe &&
      !data.isClientVatPayer &&
      data.country !== data.companyCountry
    ) {
      vat = data.vat;
      //'Europe VAT should be paid'
    } else if (
      data.region === Region.europe &&
      data.isClientVatPayer &&
      data.country !== data.companyCountry
    ) {
      vat = 0;
      //'Europe VAT Payer 0% revers charge'
    } else {
      vat = data.vat;
      // 'Last option - must pay VAT'
    }

    if ((vat || vat === 0) && data.price) {
      const vatCalc = (vat * data.price) / 100;
      this.updatedCustomerData = {
        ...data,
        vatToPay: vatCalc,
        total: vatCalc + data.price,
      };
    }

    return this.updatedCustomerData;
  }
}
