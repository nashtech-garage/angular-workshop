import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-basic-reactive-form-example',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="save()">
      <label>
        Name
        <input formControlName="name" />
      </label>
      <label>
        Email
        <input formControlName="email" type="email" />
      </label>
      <button type="submit" [disabled]="profileForm.invalid">Save</button>
    </form>
  `,
})
export class BasicReactiveFormExampleComponent {
  private readonly fb = inject(FormBuilder);

  readonly profileForm: FormGroup = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  save(): void {
    console.log('Saved profile', this.profileForm.getRawValue());
  }
}
