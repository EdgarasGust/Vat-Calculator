import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Countries, Region } from '../../interfaces/countries';
import { CountriesApiService } from '../../services/countries-api.service';

@Component({
  selector: 'app-customer-form-country',
  templateUrl: './customer-form-country.component.html',
  styleUrls: ['./customer-form-country.component.scss'],
})
export class CustomerFormCountryComponent {
  protected _onDestroy$ = new Subject<void>();
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
      next: (x) => {
        this.isLoading = false;
      },
      // Display some error message on the screen
      error: (err) => console.log(err),
    }),
      takeUntil(this._onDestroy$);
    this.isLoading = false;
  }

  trackByName(index: number, item: any) {
    return item.name;
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
