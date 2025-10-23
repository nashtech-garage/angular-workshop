import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

interface CreatePostDto {
  title: string;
  body: string;
  userId: number;
}

@Injectable({ providedIn: 'root' })
export class CreateResourceService {
  private readonly http = inject(HttpClient);
  private readonly api = 'https://jsonplaceholder.typicode.com/posts';

  createPost(payload: CreatePostDto): Observable<CreatePostDto & { id: number }> {
    return this.http.post<CreatePostDto & { id: number }>(this.api, payload);
  }
}
