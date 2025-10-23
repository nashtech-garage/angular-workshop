import { Component, inject } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-http-to-signal-example',
  providers: [provideHttpClient()],
  template: `
    <p *ngIf="posts(); else loading">Loaded {{ posts()?.length }} posts</p>
    <ng-template #loading>Loading posts...</ng-template>
  `,
})
export class HttpToSignalExampleComponent {
  private readonly http = inject(HttpClient);

  readonly posts = toSignal(this.http.get('https://jsonplaceholder.typicode.com/posts'), {
    initialValue: null,
  });
}
