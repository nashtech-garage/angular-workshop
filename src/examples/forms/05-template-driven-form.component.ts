import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-template-driven-form-example',
  imports: [FormsModule, JsonPipe],
  template: `
    <div class="flex w-full max-w-4xl flex-col gap-6">
      <form
        #contactForm="ngForm"
        class="card space-y-6"
        (ngSubmit)="submit(contactForm)"
      >
        <div class="grid gap-4 md:grid md:grid-cols-2 md:gap-8">
          <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
            Full name
            <input
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="fullName"
              ngModel
              required
              placeholder="Jane Doe"
            />
          </label>
          <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
            Phone
            <input
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="phone"
              ngModel
              pattern="^[0-9]{10}$"
              placeholder="5551234567"
            />
          </label>
        </div>
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Message
          <textarea
            class="min-h-[120px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="message"
            ngModel
            minlength="10"
            placeholder="How can we help?"
          ></textarea>
        </label>
        <div class="flex items-center justify-end">
          <button
            class="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            [disabled]="contactForm.invalid"
          >
            Send message
          </button>
        </div>
      </form>
      <pre class="card card--compact bg-slate-50 font-mono text-sm text-slate-600">
{{ contactForm.value | json }}
      </pre>
    </div>
  `,
})
export class TemplateDrivenFormExampleComponent {
  submit(form: NgForm): void {
    console.log('Submitted', form.value);
  }
}
