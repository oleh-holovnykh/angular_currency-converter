import { Component, Input } from '@angular/core';
import { ChangedInput } from 'src/app/types/changedAmount';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent {
  ChangedInput = ChangedInput;
  fromAmount: number = 0;
  toAmount: number = 0;
  fromCurrency: string = 'UAH';
  toCurrency: string = 'USD';
  @Input() operations: any = {};

  normalize(number: number) {
    return Math.round(number * 100) / 100;
  }

  convertCurrency(changedField: ChangedInput): void {
    let key =
      this.fromCurrency !== this.toCurrency
        ? `${this.fromCurrency}-${this.toCurrency}`
        : `theSame`;

    switch (changedField) {
      case ChangedInput.TO:
        this.fromAmount = this.normalize(this.toAmount / this.operations[key]);
        break;
      case ChangedInput.FROM:
        this.toAmount = this.normalize(this.fromAmount * this.operations[key]);
        break;
      case ChangedInput.CURRENCY:
        this.toAmount = this.normalize(this.fromAmount * this.operations[key]);
        break;
      default:
        break;
    }
  }
}
