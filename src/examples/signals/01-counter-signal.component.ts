import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-counter-signal-example',
  template: `
    <div class="card w-full max-w-sm space-y-4 text-center">
      <p class="text-2xl font-semibold text-slate-900">Count: {{ count() }}</p>
      <button class="btn btn-primary" type="button" (click)="increment()">Increment</button>
    </div>
  `,
})
export class CounterSignalExampleComponent {
  readonly count = signal(0);

  increment(): void {
    this.count.update((value) => value + 1);
  }
}
