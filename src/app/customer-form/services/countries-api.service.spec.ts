import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CountriesApiService } from './countries-api.service';
import { HttpClient } from '@angular/common/http';
import { Countries } from '../interfaces/countries';

describe('CountriesApiService', () => {
  let countryService: CountriesApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesApiService],
    });
    countryService = TestBed.inject(CountriesApiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Should retrieve and map a list of countries', () => {
    const api = 'https://restcountries.com/v3.1/region';
    const testData: Countries = {
      name: {
        common: 'test',
      },
      region: 'test',
    };

    httpClient.get<Countries>(api).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(api);

    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
