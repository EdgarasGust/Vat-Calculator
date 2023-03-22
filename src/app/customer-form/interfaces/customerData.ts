export interface CustomerData {
  name?: string;
  email?: string;
  tel?: number | null;
  entity?: string;
  isClientVatPayer?: boolean;
  region?: string;
  country?: string;
  companyName?: string;
  companyRegion?: string;
  companyCountry?: string;
  isCompanyVatPayer?: boolean;
  service?: string | undefined;
  price?: number | null;
  vat?: number | null;
  vatToPay?: number | null;
  total?: number | null;
}
