import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { delay, map, of } from 'rxjs';

const isUsernameTaken = (username: string) => of(username === 'angular').pipe(delay(400));

const usernameValidator: AsyncValidatorFn = (control: AbstractControl) =>
  isUsernameTaken(control.value).pipe(map((taken) => (taken ? { usernameTaken: true } : null)));

@Component({
  standalone: true,
  selector: 'app-async-validator-example',
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <form class="card w-full max-w-3xl space-y-4" [formGroup]="accountForm">
      <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
        Username
        <input
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          formControlName="username"
          placeholder="angular"
        />
      </label>
      <p
        *ngIf="accountForm.controls.username.hasError('usernameTaken')"
        class="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-red-600"
      >
        Username already taken
      </p>
      <p class="text-sm text-slate-500">
        Try typing a different username to see the async validator in action.
      </p>
    </form>
  `,
})
export class AsyncValidatorExampleComponent {
  private readonly fb = inject(FormBuilder);

  readonly accountForm = this.fb.nonNullable.group({
    username: ['', { asyncValidators: [usernameValidator] }],
  });
}
