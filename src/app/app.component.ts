import { Component, ElementRef, ViewChild } from '@angular/core';
import { CountriesService } from './countries.service';
import { debounceTime, map, filter, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('countrySearchInput', { static: true }) countrySearchInput: ElementRef;

  public title = 'countries-rxjs';
  public countries: any;
  public selectedCountry$: Observable<any>;

  constructor(private countriesService: CountriesService) { }

  public selectCountryByName(countryName: string) {
    this.selectedCountry$ = this.countriesService.getCountryByName(countryName);
  }

  ngOnInit() {
    fromEvent(this.countrySearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      filter(res => res.length >= 3),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((countryName) => {
        return this.countriesService.getCountries(countryName);
      })
    ).subscribe((countries) => {
      this.countries = countries;
    });
  }

}
