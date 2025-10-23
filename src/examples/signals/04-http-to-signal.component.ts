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
    <p *ngIf="posts().length; else loading">Loaded {{ posts().length }} posts</p>
    <ng-template #loading>Loading posts...</ng-template>
  `,
})
export class HttpToSignalExampleComponent {
  private readonly http = inject(HttpClient);

  readonly posts = toSignal(this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts'), {
    initialValue: [] as Post[],
  });
}
