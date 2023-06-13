import { Component } from '@angular/core';
import { ExtendedCurrencyData } from './types/currencyData';
import { CurrencyService } from './services/currency/currency.service';
import { Operations } from './types/operations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular_currency-converter';

  rates: ExtendedCurrencyData[] = [];
  operations: Operations = {
  'UAH-USD': 0,
  'USD-UAH': 0,
  'UAH-EUR': 0,
  'EUR-UAH': 0,
  'USD-EUR': 0,
  'EUR-USD': 0,
  'theSame': 1,
  };

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    const storedExchangeRates = sessionStorage.getItem('exchangeRates');
    const storedOperations = sessionStorage.getItem('operations');

    if (storedExchangeRates && storedOperations) {
      this.rates = JSON.parse(storedExchangeRates);
      this.operations = JSON.parse(storedOperations);
    } else {
      this.fetchExchangeRates();
    }
  }

  normalize(number: number) {
    return Math.round(number * 100) /100;
  };

  fetchExchangeRates(): void {
    this.currencyService.getCurrencyRates().subscribe((rates) => {
      const usd = rates.find(
        (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
      ) as ExtendedCurrencyData;
      const eur = rates.find(
        (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
      ) as ExtendedCurrencyData;

      usd.rateBuy = this.normalize(usd.rateBuy);
      usd.rateSell = this.normalize(usd.rateSell);
      eur.rateBuy = this.normalize(eur.rateBuy);
      eur.rateSell = this.normalize(eur.rateSell);

      if (usd && eur) {
        usd.title = 'USD';
        eur.title = 'EUR';

        this.operations = {
          'UAH-USD': 1/usd.rateSell,
          'USD-UAH': usd.rateBuy,
          'UAH-EUR': 1/eur.rateSell,
          'EUR-UAH': eur.rateBuy,
          'USD-EUR': usd.rateBuy/eur.rateSell,
          'EUR-USD': eur.rateBuy/usd.rateSell,
          'theSame': 1,
        }

        this.rates = [usd, eur];
        sessionStorage.setItem('exchangeRates', JSON.stringify(this.rates));
        sessionStorage.setItem('operations', JSON.stringify(this.operations));
      }
    });
  }
}
