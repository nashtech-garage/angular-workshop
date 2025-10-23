import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { specialCharacterValidator } from './auth.validators';

@Component({
  standalone: true,
  selector: 'app-auth-sign-in-example',
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <form
      class="card w-full max-w-3xl space-y-6"
      [formGroup]="signInForm"
      (ngSubmit)="submit()"
      novalidate
    >
      <header class="space-y-2">
        <h2 class="text-2xl font-semibold text-slate-900">Sign in</h2>
        <p class="text-sm text-slate-600">
          Enter your email address and password to access your account.
        </p>
      </header>
      <div class="flex flex-col gap-6">
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Email address
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            formControlName="email"
            type="email"
            autocomplete="email"
            placeholder="jane@example.com"
          />
          <span
            *ngIf="hasError('email', 'required')"
            class="text-xs font-medium text-rose-600"
          >
            Email is required.
          </span>
          <span
            *ngIf="hasError('email', 'email')"
            class="text-xs font-medium text-rose-600"
          >
            Enter a valid email address.
          </span>
        </label>
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Password
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            formControlName="password"
            type="password"
            autocomplete="current-password"
            placeholder="••••••••"
          />
          <span
            *ngIf="hasError('password', 'required')"
            class="text-xs font-medium text-rose-600"
          >
            Password is required.
          </span>
          <span
            *ngIf="hasError('password', 'minlength')"
            class="text-xs font-medium text-rose-600"
          >
            Password must be at least 8 characters.
          </span>
          <span
            *ngIf="hasError('password', 'specialCharacter')"
            class="text-xs font-medium text-rose-600"
          >
            Include at least one special character.
          </span>
        </label>
      </div>
      <div class="flex items-center justify-end gap-3">
        <button class="btn btn-secondary" type="reset" (click)="reset()">
          Reset
        </button>
        <button
          class="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          [disabled]="signInForm.invalid && submitted"
        >
          Sign in
        </button>
      </div>
    </form>
  `,
})
export class AuthSignInExampleComponent {
  private readonly fb = inject(FormBuilder);

  protected submitted = false;

  readonly signInForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), specialCharacterValidator],
    ],
  });

  hasError(controlName: 'email' | 'password', error: string): boolean {
    const control = this.signInForm.controls[controlName];
    return (
      control.hasError(error) && (control.dirty || control.touched || this.submitted)
    );
  }

  submit(): void {
    this.submitted = true;
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    console.log('Sign in data', this.signInForm.getRawValue());
  }

  reset(): void {
    this.signInForm.reset();
    this.submitted = false;
  }
}
