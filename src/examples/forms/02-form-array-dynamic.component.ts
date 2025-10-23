import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-form-array-dynamic-example',
  imports: [ReactiveFormsModule, NgFor],
  template: `
    <form class="card w-full max-w-3xl space-y-6" [formGroup]="skillsForm">
      <div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <label class="flex flex-1 flex-col gap-2 text-sm font-medium text-slate-600">
          New skill
          <input
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            #skillInput
            placeholder="Angular"
          />
        </label>
        <button
          class="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          (click)="addSkill(skillInput.value); skillInput.value = ''"
        >
          Add skill
        </button>
      </div>
      <ul class="flex flex-col gap-3 list-none">
        <li
          class="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
          *ngFor="let control of skills.controls; let i = index"
        >
          <span class="font-medium text-slate-900">{{ control.value }}</span>
          <button class="btn btn-outline" type="button" (click)="removeSkill(i)">Remove</button>
        </li>
      </ul>
    </form>
  `,
})
export class FormArrayDynamicExampleComponent {
  private readonly fb = inject(FormBuilder);

  readonly skillsForm = this.fb.nonNullable.group({
    skills: this.fb.nonNullable.array<FormControl<string>>([
      this.fb.nonNullable.control('Angular'),
    ]),
  });

  get skills(): FormArray<FormControl<string>> {
    return this.skillsForm.controls.skills;
  }

  addSkill(skill: string): void {
    if (skill.trim()) {
      this.skills.push(this.fb.nonNullable.control(skill.trim()));
    }
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
}
