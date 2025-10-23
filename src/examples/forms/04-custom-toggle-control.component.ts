import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-custom-toggle-control',
  template: `
    <button type="button" (click)="toggle()" [class.on]="value()">
      {{ value() ? 'On' : 'Off' }}
    </button>
  `,
  styles: [
    `button { padding: 0.75rem 1.25rem; border-radius: 1.25rem; border: 0; }
     .on { background: #2ecc71; color: #fff; }
     :host { display: inline-block; }`,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomToggleControlComponent),
      multi: true,
    },
  ],
})
export class CustomToggleControlComponent implements ControlValueAccessor {
  readonly value = signal(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.value.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // nothing to handle for this simple example
    console.debug('Toggle disabled state', isDisabled);
  }

  toggle(): void {
    const updated = !this.value();
    this.value.set(updated);
    this.onChange(updated);
    this.onTouched();
  }
}
