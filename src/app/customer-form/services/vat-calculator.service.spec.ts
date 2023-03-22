import { TestBed } from '@angular/core/testing';
import { CustomerData } from '../interfaces/customerData';
import { VatCalculatorService } from './vat-calculator.service';

describe('VatCalculatorService', () => {
  let service: VatCalculatorService;
  const calculator = new VatCalculatorService();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0 if company is not a VAT payer', () => {
    const data = {
      name: '',
      email: '',
      entity: '',
      isClientVatPayer: false,
      region: 'Americas',
      country: 'United States',
      companyName: 'any',
      companyRegion: 'Americas',
      companyCountry: 'United States',
      isCompanyVatPayer: false,
      service: '',
      vat: 20,
      price: 100,
    };
    const result = calculator.calculateVat(data);
    expect(result.vatToPay).toEqual(0);
  });

  it('should return 0 if client lives outside the EU', () => {
    const data = {
      name: '',
      email: '',
      entity: '',
      isClientVatPayer: true,
      region: 'Americas',
      country: 'United States',
      companyName: 'any',
      companyRegion: 'Americas',
      companyCountry: 'United States',
      isCompanyVatPayer: true,
      service: '',
      vat: 20,
      price: 100,
    };
    const result = calculator.calculateVat(data);
    expect(result.vatToPay).toEqual(0);
  });

  it('should return 21, lives in the EU, is not a VAT payer but lives in a different country from the service provider', () => {
    const data = {
      name: '',
      email: '',
      entity: '',
      isClientVatPayer: false,
      region: 'Europe',
      country: 'Germany',
      companyName: 'any',
      companyRegion: 'Europe',
      companyCountry: 'Poland',
      isCompanyVatPayer: true,
      service: '',
      vat: 21,
      price: 100,
    };
    const result = calculator.calculateVat(data);
    expect(result.vatToPay).toEqual(21);
  });
  it('should return 0. Lives in the EU, is a VAT payer but lives in a different country from the service provider. 0% reverse charge applies', () => {
    const data = {
      name: '',
      email: '',
      entity: '',
      isClientVatPayer: true,
      region: 'Europe',
      country: 'Germany',
      companyName: 'any',
      companyRegion: 'Europe',
      companyCountry: 'Poland',
      isCompanyVatPayer: true,
      service: '',
      vat: 21,
      price: 100,
    };
    const result = calculator.calculateVat(data);
    expect(result.vatToPay).toEqual(0);
  });
  it('should return 21. When the customer and the service provider live in the same country, VAT always applies', () => {
    const data = {
      name: '',
      email: '',
      entity: '',
      isClientVatPayer: true,
      region: 'Europe',
      country: 'Germany',
      companyName: 'any',
      companyRegion: 'Europe',
      companyCountry: 'Germany',
      isCompanyVatPayer: true,
      service: '',
      vat: 21,
      price: 100,
    };
    const result = calculator.calculateVat(data);
    expect(result.vatToPay).toEqual(21);
  });
  it('should return updated customer data object with total to pay', () => {
    const data: CustomerData = {
      name: 'Jon',
      email: 'jon@yahoo.com',
      entity: 'legal entity',
      isClientVatPayer: true,
      region: 'Europe',
      country: 'Germany',
      companyName: 'any',
      companyRegion: 'Europe',
      companyCountry: 'Germany',
      isCompanyVatPayer: true,
      service: 'any',
      vat: 21,
      price: 100,
    };
    const result = calculator.calculateVat(data);
    expect(result.total).toEqual(121);
  });
});
