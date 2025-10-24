import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  matchFieldsValidator,
  specialCharacterValidator,
} from './auth.validators';

@Component({
  standalone: true,
  selector: 'app-auth-sign-up-example',
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <form
      class="card w-full max-w-3xl space-y-6"
      [formGroup]="signUpForm"
      (ngSubmit)="submit()"
      novalidate
    >
      <header class="space-y-2">
        <h2 class="text-2xl font-semibold text-slate-900">Create an account</h2>
        <p class="text-sm text-slate-600">
          Set up your account by providing your contact details and a secure password.
        </p>
      </header>
      <div class="grid gap-6 md:grid-cols-2">
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          First name
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            formControlName="firstName"
            type="text"
            autocomplete="given-name"
            placeholder="Jane"
          />
          <span
            *ngIf="hasError('firstName', 'required')"
            class="text-xs font-medium text-rose-600"
          >
            First name is required.
          </span>
        </label>
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Last name
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            formControlName="lastName"
            type="text"
            autocomplete="family-name"
            placeholder="Doe"
          />
          <span
            *ngIf="hasError('lastName', 'required')"
            class="text-xs font-medium text-rose-600"
          >
            Last name is required.
          </span>
        </label>
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600 md:col-span-2">
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
      </div>
      <div class="grid gap-6 md:grid-cols-2">
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Password
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            formControlName="password"
            type="password"
            autocomplete="new-password"
            placeholder="Create a password"
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
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Confirm password
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            formControlName="confirmPassword"
            type="password"
            autocomplete="new-password"
            placeholder="Repeat your password"
          />
          <span
            *ngIf="hasError('confirmPassword', 'required')"
            class="text-xs font-medium text-rose-600"
          >
            Confirming your password is required.
          </span>
          <span
            *ngIf="shouldShowMismatchError()"
            class="text-xs font-medium text-rose-600"
          >
            Passwords must match.
          </span>
        </label>
      </div>
      <p class="rounded-xl bg-indigo-50 px-4 py-3 text-xs text-indigo-700">
        Passwords must be at least 8 characters long and include one special character
        such as !, @, #, or $.
      </p>
      <div class="flex items-center justify-end gap-3">
        <button class="btn btn-secondary" type="reset" (click)="reset()">
          Reset
        </button>
        <button
          class="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          [disabled]="signUpForm.invalid && submitted"
        >
          Create account
        </button>
      </div>
    </form>
  `,
})
export class AuthSignUpExampleComponent {
  private readonly fb = inject(FormBuilder);

  protected submitted = false;

  readonly signUpForm = this.fb.nonNullable.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), specialCharacterValidator],
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: matchFieldsValidator('password', 'confirmPassword'),
    },
  );

  hasError(
    controlName: 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword',
    error: string,
  ): boolean {
    const control = this.signUpForm.controls[controlName];
    return (
      control.hasError(error) && (control.dirty || control.touched || this.submitted)
    );
  }

  shouldShowMismatchError(): boolean {
    const control = this.signUpForm.controls.confirmPassword;
    return (
      this.signUpForm.hasError('fieldsMismatch') &&
      (control.dirty || control.touched || this.submitted)
    );
  }

  submit(): void {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    console.log('Sign up data', this.signUpForm.getRawValue());
  }

  reset(): void {
    this.signUpForm.reset();
    this.submitted = false;
  }
}
