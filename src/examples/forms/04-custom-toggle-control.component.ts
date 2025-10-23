import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-custom-toggle-control',
  template: `
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-600"
      [class.bg-emerald-100]="value()"
      [class.text-emerald-600]="value()"
      [class.shadow-lg]="value()"
      (click)="toggle()"
    >
      {{ value() ? 'On' : 'Off' }}
    </button>
  `,
  styles: [`:host { display: inline-block; }`],
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
