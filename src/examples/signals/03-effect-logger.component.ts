import { Component, effect, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-effect-logger-example',
  template: `
    <input [value]="search()" (input)="search.set($any($event.target).value)" placeholder="Search term" />
  `,
})
export class EffectLoggerExampleComponent {
  readonly search = signal('');

  constructor() {
    effect(() => {
      console.log('Search term changed', this.search());
    });
  }
}
