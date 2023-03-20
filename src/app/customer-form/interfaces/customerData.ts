export interface CustomerData {
  name: string | undefined;
  email: string | undefined;
  tel?: number | null;
  entity: string | undefined;
  isClientVatPayer: boolean | undefined;
  region: string | undefined;
  country: string;
  companyName: string | undefined;
  companyRegion: string | undefined;
  companyCountry: string | undefined;
  isCompanyVatPayer: boolean | undefined;
  service: string | undefined;
  price?: number | null;
  vat?: number | null;
  vatToPay?: number | null;
  total?: number | null;
}
