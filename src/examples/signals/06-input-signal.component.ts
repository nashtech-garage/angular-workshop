import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-input-signal-example',
  template: `
    <div class="card w-full max-w-sm space-y-2">
      <p class="text-sm text-slate-500">The component receives its inputs as signals.</p>
      <p class="text-lg font-semibold text-slate-900">
        {{ label() }}: <span class="text-indigo-600">{{ value() }}</span>
      </p>
    </div>
  `,
})
export class InputSignalExampleComponent {
  readonly label = input<string>('Value');
  readonly value = input<number>(0);
}
