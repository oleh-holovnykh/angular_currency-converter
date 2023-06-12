import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyData } from 'src/app/types/currencyData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencyRates(): Observable<CurrencyData[]> {
    const url = 'https://api.monobank.ua/bank/currency'

    return this.http.get<CurrencyData[]>(url)
  }
}
