import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-computed-total-example',
  imports: [CurrencyPipe],
  template: `
    <div class="card w-full max-w-md space-y-5">
      <div class="flex flex-col gap-4">
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Price
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="number"
            [value]="price()"
            (input)="price.set($any($event.target).valueAsNumber || 0)"
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Quantity
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="number"
            [value]="quantity()"
            (input)="quantity.set($any($event.target).valueAsNumber || 0)"
          />
        </label>
      </div>
      <p class="rounded-xl bg-indigo-50 px-4 py-3 text-base font-semibold text-indigo-600">
        Total: {{ total() | currency }}
      </p>
    </div>
  `,
})
export class ComputedTotalExampleComponent {
  readonly price = signal(12.5);
  readonly quantity = signal(1);
  readonly total = computed(() => this.price() * this.quantity());
}
