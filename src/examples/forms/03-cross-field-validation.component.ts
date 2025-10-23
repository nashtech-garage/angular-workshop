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
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="registration" (ngSubmit)="register()">
      <label>
        Password
        <input type="password" formControlName="password" />
      </label>
      <label>
        Confirm
        <input type="password" formControlName="confirmPassword" />
      </label>
      <p *ngIf="isMismatch()" class="error">Passwords do not match</p>
      <button type="submit" [disabled]="registration.invalid">Register</button>
    </form>
  `,
  styles: [
    `.error { color: #c0392b; }`,
  ],
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
