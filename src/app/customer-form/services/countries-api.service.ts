import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  retry,
  throwError,
} from 'rxjs';

import { Countries } from '../interfaces/countries';

@Injectable({
  providedIn: 'root',
})
export class CountriesApiService {
  private countriesSubject = new BehaviorSubject<Countries[]>([]);
  countries$: Observable<Countries[]> = this.countriesSubject.asObservable();
  api = 'https://restcountries.com/v3.1/region';

  constructor(private http: HttpClient) {}

  getCountries(region: string) {
    return this.http.get<Countries[]>(`${this.api}/${region}`).pipe(
      map((response) => {
        const countries = response.map((res) => ({
          name: res.name,
          region: res.region,
        }));
        this.countriesSubject.next(countries);
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
