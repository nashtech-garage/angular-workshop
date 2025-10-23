import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface PostDto {
  id: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class BasicGetService {
  private readonly http = inject(HttpClient);
  private readonly api = 'https://jsonplaceholder.typicode.com/posts';

  fetchPosts(): Observable<PostDto[]> {
    return this.http.get<PostDto[]>(this.api);
  }
}
