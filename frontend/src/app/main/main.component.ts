import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/services/http.service';
import { CitiesStoreService } from '../core/store/cities-store.service';
import { CurrentCityStoreService } from '../core/store/current-city-store.service';
import { CitiesModel } from './shared/models/cities.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentCity: CitiesModel;
  allCities$: Observable<CitiesModel[]>;
  selectedCity: FormControl = new FormControl();
  constructor(
    private citiesStoreService: CitiesStoreService,
    private currentCityStoreService: CurrentCityStoreService,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.allCities$ = this.citiesStoreService.getCities();
  }

  public chooseCity(city: CitiesModel): void {
    this.currentCity = city;
    this.currentCityStoreService.setCity(city);
  }
  public reset(): void {
    this.selectedCity.reset();
    this.currentCityStoreService.reset();
  }
}
