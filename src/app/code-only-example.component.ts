import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-code-only-example',
  imports: [NgIf],
  template: `
    <article class="card card--compact w-full max-w-3xl">
      <h2 class="mb-4 text-2xl font-semibold text-slate-900">{{ title }}</h2>
      <p class="mb-6 text-base leading-relaxed text-slate-600">{{ description }}</p>
      <p class="flex items-baseline gap-3 text-sm text-slate-700" *ngIf="file">
        <span class="font-medium uppercase tracking-wide text-indigo-600">Source file:</span>
        <code class="rounded-lg bg-indigo-50 px-4 py-2 font-mono text-sm text-indigo-600">{{ file }}</code>
      </p>
    </article>
  `,
})
export class CodeOnlyExampleComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly title = (this.route.snapshot.data['title'] as string) ?? 'Example';
  protected readonly file = this.route.snapshot.data['file'] as string | undefined;
  protected readonly description =
    (this.route.snapshot.data['description'] as string) ??
    'This example focuses on service-level APIs. Open the linked source file to explore the implementation.';
}
