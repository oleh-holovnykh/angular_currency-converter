export interface CurrencyData {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateCross: number;
  rateSell: number;
}

export interface ExtendedCurrencyData extends CurrencyData {
  title: string;
}
