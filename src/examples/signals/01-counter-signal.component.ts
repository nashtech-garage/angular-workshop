import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-counter-signal-example',
  template: `
    <p>Count: {{ count() }}</p>
    <button (click)="increment()">Increment</button>
  `,
})
export class CounterSignalExampleComponent {
  readonly count = signal(0);

  increment(): void {
    this.count.update((value) => value + 1);
  }
}
