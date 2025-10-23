import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-code-only-example',
  imports: [NgIf],
  template: `
    <article class="code-only">
      <h2 class="code-only__title">{{ title }}</h2>
      <p class="code-only__description">{{ description }}</p>
      <p class="code-only__source" *ngIf="file">
        <span>Source file:</span>
        <code>{{ file }}</code>
      </p>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .code-only {
        border-radius: 1rem;
        border: 1px solid rgba(15, 23, 42, 0.08);
        padding: 2rem;
        background: white;
        box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
        max-width: 720px;
      }

      .code-only__title {
        margin: 0 0 0.75rem;
        font-size: 1.5rem;
        font-weight: 600;
      }

      .code-only__description {
        margin: 0 0 1.5rem;
        line-height: 1.5;
        color: #334155;
      }

      .code-only__source {
        margin: 0;
        display: flex;
        gap: 0.5rem;
        align-items: baseline;
        color: #1f2937;
      }

      code {
        background: rgba(96, 165, 250, 0.15);
        border-radius: 0.5rem;
        padding: 0.25rem 0.5rem;
        font-family: 'Fira Code', 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono',
          'Courier New', monospace;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class CodeOnlyExampleComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly title = (this.route.snapshot.data['title'] as string) ?? 'Example';
  protected readonly file = this.route.snapshot.data['file'] as string | undefined;
  protected readonly description =
    (this.route.snapshot.data['description'] as string) ??
    'This example focuses on service-level APIs. Open the linked source file to explore the implementation.';
}
