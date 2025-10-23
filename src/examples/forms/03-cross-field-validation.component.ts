import { NgIf } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';

const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
};

@Component({
  standalone: true,
  selector: 'app-cross-field-validation-example',
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <form class="card w-full max-w-3xl space-y-6" [formGroup]="registration" (ngSubmit)="register()">
      <div class="grid gap-4 md:grid md:grid-cols-2 md:gap-8">
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Password
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            formControlName="password"
            placeholder="••••••••"
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Confirm password
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            formControlName="confirmPassword"
            placeholder="Repeat password"
          />
        </label>
      </div>
      <p *ngIf="isMismatch()" class="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-red-600">
        Passwords do not match
      </p>
      <div class="flex items-center justify-end">
        <button
          class="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          [disabled]="registration.invalid"
        >
          Register
        </button>
      </div>
    </form>
  `,
})
export class CrossFieldValidationExampleComponent {
  private readonly fb = inject(FormBuilder);

  readonly registration = this.fb.nonNullable.group(
    {
      password: '',
      confirmPassword: '',
    },
    { validators: passwordMatchValidator },
  );

  readonly isMismatch = computed(() => this.registration.hasError('passwordMismatch'));

  register(): void {
    console.log('Registered with', this.registration.value);
  }
}
