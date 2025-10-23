import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

interface Post {
  id: number;
  title: string;
  body: string;
}

@Component({
  standalone: true,
  selector: 'app-http-to-signal-example',
  imports: [HttpClientModule, NgIf],
  template: `
    <div class="card w-full max-w-md space-y-4">
      <p *ngIf="posts().length; else loading" class="text-base font-medium text-green-600">
        Loaded {{ posts().length }} posts
      </p>
      <ng-template #loading>
        <p class="text-sm text-slate-500">Loading posts...</p>
      </ng-template>
      <p class="text-xs text-slate-500">
        This example converts an HTTP observable into a signal using <code class="rounded-lg bg-indigo-50 px-3 py-1 font-mono text-xs text-indigo-600">toSignal</code>.
      </p>
    </div>
  `,
})
export class HttpToSignalExampleComponent {
  private readonly http = inject(HttpClient);

  readonly posts = toSignal(this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts'), {
    initialValue: [] as Post[],
  });
}
