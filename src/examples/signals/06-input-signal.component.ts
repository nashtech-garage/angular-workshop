import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-input-signal-example',
  template: `
    <p>{{ label() }}: {{ value() }}</p>
  `,
})
export class InputSignalExampleComponent {
  readonly label = input<string>('Value');
  readonly value = input<number>(0);
}
