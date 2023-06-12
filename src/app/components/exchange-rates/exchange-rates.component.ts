import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { CurrencyData, ExtendedCurrencyData } from 'src/app/types/currencyData';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss'],
})
export class ExchangeRatesComponent implements OnInit {
  exchangeRates: ExtendedCurrencyData[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    if (this.exchangeRates.length === 0) {
      this.fetchExchangeRates();
    }
  }

  fetchExchangeRates(): void {
    this.currencyService.getCurrencyRates().subscribe((rates) => {
      console.log(rates);
      const usd = rates.find(
        (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
      ) as ExtendedCurrencyData;
      const eur = rates.find(
        (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
      ) as ExtendedCurrencyData;

      if (usd && eur) {
        usd.title = 'USD';
        eur.title = 'EUR';
        this.exchangeRates = [usd, eur];
        console.log(this.exchangeRates);
      }
    });
  }
}
