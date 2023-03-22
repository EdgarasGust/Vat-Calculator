import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';

import { Countries, Region } from '../../interfaces/countries';
import { CountriesApiService } from '../../services/countries-api.service';

@Component({
  selector: 'app-customer-form-country',
  templateUrl: './customer-form-country.component.html',
  styleUrls: ['./customer-form-country.component.scss'],
})
export class CustomerFormCountryComponent {
  countries$: Observable<Countries[]> = this.countriesApiService.countries$;
  isLoading: boolean = false;

  regions: Region[] = [
    Region.africa,
    Region.americas,
    Region.asia,
    Region.europe,
    Region.oceania,
  ];

  @Input() form: FormGroup;
  @Input() region: string;
  @Input() country: string;

  constructor(private countriesApiService: CountriesApiService) {}

  getCountries(region: string) {
    this.isLoading = true;
    this.countriesApiService.getCountries(region).subscribe({
      next: () => {
        this.isLoading = false;
      },
      // Display some error message on the screen
      error: (err) => {
        console.error(err.message);
        this.isLoading = false;
      },
    });
  }

  trackByName(index: number, item: any) {
    return item.name;
  }
}
