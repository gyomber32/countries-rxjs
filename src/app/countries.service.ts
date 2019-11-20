import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  public getCountries(countryName: string) {
    return this.http.get(`https://restcountries.eu/rest/v2/name/${countryName}`);
  }

  public getCountryByName(countryName: string) {
    return this.http.get(`https://restcountries.eu/rest/v2/name/${countryName}`);
  }
}
