import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

interface SearchResult {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class QueryParamsService {
  private readonly http = inject(HttpClient);

  search(term: string): Observable<SearchResult[]> {
    const params = new HttpParams({ fromObject: { q: term, limit: 10 } });
    return this.http.get<SearchResult[]>('https://api.example.com/search', { params });
  }
}
