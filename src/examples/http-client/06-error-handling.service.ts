import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorHandlingService {
  private readonly http = inject(HttpClient);

  loadUser(userId: number): Observable<unknown> {
    return this.http.get(`https://api.example.com/users/${userId}`).pipe(
      catchError((error) => {
        console.error('Failed to load user', error);
        return throwError(() => new Error('Unable to load user'));
      }),
    );
  }
}
