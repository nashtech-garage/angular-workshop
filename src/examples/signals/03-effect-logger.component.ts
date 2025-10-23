import { Component, effect, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-effect-logger-example',
  template: `
    <div class="card w-full max-w-md space-y-4">
      <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
        Search term
        <input
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          [value]="search()"
          (input)="search.set($any($event.target).value)"
          placeholder="Signals in Angular"
        />
      </label>
      <p class="text-sm text-slate-500">Open the console to watch the effect respond to updates.</p>
    </div>
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
