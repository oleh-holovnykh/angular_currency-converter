import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencyRates() {
    const url = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5'

    return this.http.get(url)
  }
}
