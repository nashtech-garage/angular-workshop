import { Component, inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { delay, map, of } from 'rxjs';

const isUsernameTaken = (username: string) => of(username === 'angular').pipe(delay(400));

const usernameValidator: AsyncValidatorFn = (control: AbstractControl) =>
  isUsernameTaken(control.value).pipe(map((taken) => (taken ? { usernameTaken: true } : null)));

@Component({
  standalone: true,
  selector: 'app-async-validator-example',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="accountForm">
      <label>
        Username
        <input formControlName="username" />
      </label>
      <p *ngIf="accountForm.controls.username.hasError('usernameTaken')">
        Username already taken
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
