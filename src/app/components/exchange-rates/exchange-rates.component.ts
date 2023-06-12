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
    const storedExchangeRates = sessionStorage.getItem('exchangeRates');

    if (storedExchangeRates) {
      this.exchangeRates = JSON.parse(storedExchangeRates);
    } else {
      this.fetchExchangeRates();
    }
  }

  fetchExchangeRates(): void {
    this.currencyService.getCurrencyRates().subscribe((rates) => {
      const usd = rates.find(
        (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
      ) as ExtendedCurrencyData;
      const eur = rates.find(
        (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
      ) as ExtendedCurrencyData;

      usd.rateBuy = parseFloat(usd.rateBuy.toFixed(2));
      usd.rateSell = parseFloat(usd.rateSell.toFixed(2));
      eur.rateBuy = parseFloat(eur.rateBuy.toFixed(2));
      eur.rateSell = parseFloat(eur.rateSell.toFixed(2));

      if (usd && eur) {
        usd.title = 'USD';
        eur.title = 'EUR';

        this.exchangeRates = [usd, eur];
        sessionStorage.setItem('exchangeRates', JSON.stringify(this.exchangeRates))
      }
    });
  }
}
