import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { CurrencyData, ExtendedCurrencyData } from 'src/app/types/currencyData';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss'],
})
export class ExchangeRatesComponent {
  @Input() rates: ExtendedCurrencyData[] = [];
}
