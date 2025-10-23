import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-form-array-dynamic-example',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="skillsForm">
      <label>
        New skill
        <input #skillInput />
      </label>
      <button type="button" (click)="addSkill(skillInput.value); skillInput.value = ''">
        Add
      </button>
      <ul>
        <li *ngFor="let control of skills.controls; let i = index">
          {{ control.value }}
          <button type="button" (click)="removeSkill(i)">Remove</button>
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
