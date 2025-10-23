import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export const RETRY_COUNT = new HttpContextToken<number>(() => 0);

@Injectable({ providedIn: 'root' })
export class HttpContextTokenService {
  private readonly http = inject(HttpClient);

  getWithRetryContext<T>(url: string, retryCount: number): Observable<T> {
    const context = new HttpContext().set(RETRY_COUNT, retryCount);
    return this.http.get<T>(url, { context });
  }
}
