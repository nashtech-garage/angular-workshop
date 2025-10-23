import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-template-driven-form-example',
  imports: [FormsModule, JsonPipe],
  template: `
    <form #contactForm="ngForm" (ngSubmit)="submit(contactForm)">
      <input name="fullName" ngModel required placeholder="Full name" />
      <input name="phone" ngModel pattern="^[0-9]{10}$" placeholder="Phone" />
      <textarea name="message" ngModel minlength="10" placeholder="Message"></textarea>
      <button type="submit" [disabled]="contactForm.invalid">Send</button>
    </form>
    <pre>{{ contactForm.value | json }}</pre>
  `,
})
export class TemplateDrivenFormExampleComponent {
  submit(form: NgForm): void {
    console.log('Submitted', form.value);
  }
}
