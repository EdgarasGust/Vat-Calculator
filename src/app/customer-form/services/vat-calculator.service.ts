import { Injectable } from '@angular/core';
import { Region } from '../interfaces/countries';
import { CustomerData } from '../interfaces/customerData';

@Injectable({
  providedIn: 'root',
})
export class VatCalculatorService {
  private updatedCustomerData: CustomerData;
  private vat: number | undefined | null;

  constructor() {}

  calculateVat(data: CustomerData) {
    // 'Service provider is not a VAT payer'
    if (!data.isCompanyVatPayer) {
      this.vat = 0;
    }
    // 'Not Europe'
    else if (data.region !== Region.europe) {
      this.vat = 0;
    }
    //'Lives in EU, but not a VAT payer (VAT should be paid)'
    else if (
      data.region === Region.europe &&
      !data.isClientVatPayer &&
      data.country !== data.companyCountry
    ) {
      this.vat = data.vat;
    }
    //'Lives in EU, is a VAT Payer, different country. 0% revers charge'
    else if (
      data.region === Region.europe &&
      data.isClientVatPayer &&
      data.country !== data.companyCountry
    ) {
      this.vat = 0;
    }
    // 'Lives in a same country - VAT Always apply'
    else {
      this.vat = data.vat;
    }

    if ((this.vat || this.vat === 0) && data.price) {
      const vatCalc = (this.vat * data.price) / 100;
      this.updatedCustomerData = {
        ...data,
        vatToPay: vatCalc,
        total: vatCalc + data.price,
      };
    }

    return this.updatedCustomerData;
  }
}
