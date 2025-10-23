import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgressEventsService {
  private readonly http = inject(HttpClient);

  downloadFile(url: string): Observable<number> {
    return this.http.get(url, { observe: 'events', responseType: 'blob', reportProgress: true }).pipe(
      filter((event): event is HttpEvent<Blob> =>
        event.type === HttpEventType.DownloadProgress || event.type === HttpEventType.Response,
      ),
      map((event) => {
        if (event.type === HttpEventType.DownloadProgress && event.total) {
          return Math.round((event.loaded / event.total) * 100);
        }
        return 100;
      }),
    );
  }
}
