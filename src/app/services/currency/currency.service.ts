import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CurrencyData } from 'src/app/types/currencyData';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencyRates(): Observable<CurrencyData[]> {
    const url = 'https://api.monobank.ua/bank/currency'

    return this.http.get<CurrencyData[]>(url).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(`Can't load currencies rates: ${error.message}`)))
    )
  }
}
