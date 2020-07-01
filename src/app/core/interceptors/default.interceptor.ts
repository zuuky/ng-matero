import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      mergeMap((event: any) => {
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        return of(err);
      })
    );
  }
}
