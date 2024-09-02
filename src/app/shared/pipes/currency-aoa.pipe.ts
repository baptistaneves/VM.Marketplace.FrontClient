import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyAoa'
})
export class CurrencyAoaPipe implements PipeTransform {
  transform(value: number): string {
    // Format the value as currency with 2 decimal places
    const formattedValue = value.toFixed(2);
    // Return the formatted value with AOA on the right
    return `${formattedValue} AOA`;
  }
}
