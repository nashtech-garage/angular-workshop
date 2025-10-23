import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-basic-reactive-form-example',
  imports: [ReactiveFormsModule],
  template: `
    <form
      class="card w-full max-w-3xl space-y-6"
      [formGroup]="profileForm"
      (ngSubmit)="save()"
    >
      <div class="flex flex-col gap-6">
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Name
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            formControlName="name"
            placeholder="Jane Smith"
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Email
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            formControlName="email"
            type="email"
            placeholder="jane@example.com"
          />
        </label>
      </div>
      <div class="flex items-center justify-end">
        <button
          class="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          [disabled]="profileForm.invalid"
        >
          Save profile
        </button>
      </div>
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
