import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-computed-total-example',
  imports: [CurrencyPipe],
  template: `
    <label>
      Price
      <input type="number" [value]="price()" (input)="price.set($any($event.target).valueAsNumber || 0)" />
    </label>
    <label>
      Quantity
      <input type="number" [value]="quantity()" (input)="quantity.set($any($event.target).valueAsNumber || 0)" />
    </label>
    <p>Total: {{ total() | currency }}</p>
  `,
})
export class ComputedTotalExampleComponent {
  readonly price = signal(12.5);
  readonly quantity = signal(1);
  readonly total = computed(() => this.price() * this.quantity());
}
