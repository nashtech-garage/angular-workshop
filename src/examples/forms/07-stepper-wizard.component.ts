import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-stepper-wizard-example',
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <section *ngIf="currentStep() === 0">
      <h2>Step 1: Personal details</h2>
      <form [formGroup]="personalForm">
        <input placeholder="First name" formControlName="firstName" />
        <input placeholder="Last name" formControlName="lastName" />
      </form>
    </section>

    <section *ngIf="currentStep() === 1">
      <h2>Step 2: Address</h2>
      <form [formGroup]="addressForm">
        <input placeholder="Street" formControlName="street" />
        <input placeholder="City" formControlName="city" />
      </form>
    </section>

    <button type="button" (click)="previous()" [disabled]="currentStep() === 0">Back</button>
    <button type="button" (click)="next()" [disabled]="!canProceed()">
      {{ currentStep() === stepsCount - 1 ? 'Finish' : 'Next' }}
    </button>
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
