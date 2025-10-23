import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-stepper-wizard-example',
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="card w-full max-w-3xl space-y-6">
      <div class="flex items-center gap-3">
        <span class="badge-soft">Step {{ currentStep() + 1 }} of {{ stepsCount }}</span>
        <h2 class="text-xl font-semibold text-slate-900">
          {{ currentStep() === 0 ? 'Personal details' : 'Address' }}
        </h2>
      </div>

      <section *ngIf="currentStep() === 0" class="space-y-4">
        <p class="text-sm text-slate-600">
          Provide your basic information to get started.
        </p>
        <form class="grid gap-4 md:grid md:grid-cols-2 md:gap-8" [formGroup]="personalForm">
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="First name"
            formControlName="firstName"
          />
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Last name"
            formControlName="lastName"
          />
        </form>
      </section>

      <section *ngIf="currentStep() === 1" class="space-y-4">
        <p class="text-sm text-slate-600">Where can we reach you?</p>
        <form class="grid gap-4 md:grid md:grid-cols-2 md:gap-8" [formGroup]="addressForm">
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Street"
            formControlName="street"
          />
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="City"
            formControlName="city"
          />
        </form>
      </section>

      <div class="flex items-center justify-between">
        <button
          class="btn btn-outline disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          (click)="previous()"
          [disabled]="currentStep() === 0"
        >
          Back
        </button>
        <button
          class="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          (click)="next()"
          [disabled]="!canProceed()"
        >
          {{ currentStep() === stepsCount - 1 ? 'Finish wizard' : 'Next step' }}
        </button>
      </div>
    </div>
  `,
})
export class StepperWizardExampleComponent {
  private readonly fb = inject(FormBuilder);

  readonly stepsCount = 2;
  readonly currentStep = signal(0);

  readonly personalForm: FormGroup = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  readonly addressForm: FormGroup = this.fb.nonNullable.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
  });

  readonly canProceed = computed(() => {
    return this.currentStep() === 0
      ? this.personalForm.valid
      : this.personalForm.valid && this.addressForm.valid;
  });

  next(): void {
    if (this.currentStep() < this.stepsCount - 1 && this.canProceed()) {
      this.currentStep.update((step) => step + 1);
    } else if (this.currentStep() === this.stepsCount - 1 && this.canProceed()) {
      console.log('Submit wizard', {
        ...this.personalForm.getRawValue(),
        ...this.addressForm.getRawValue(),
      });
    }
  }

  previous(): void {
    this.currentStep.update((step) => Math.max(0, step - 1));
  }
}
