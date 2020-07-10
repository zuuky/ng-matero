import {Injectable, Injector} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ModelConsService} from '@shared/services/modelcons.service';
import {LocalStorageService} from '@shared/services/storage.service';
import {environment} from '@env/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  static handleData(data: HttpResponse<any>): Observable<any> {
    return of(data.clone({
      body: data.body
    }));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://') && !url.startsWith('./assets/') && !url.startsWith('assets/')) {
      url = environment.SERVER_URL + url;
    }
    const reqClone = req.clone({
      url, setHeaders: {
        Authorization: 'Bearer ' + LocalStorageService.get(ModelConsService.TOKEN_KEY).token
      },
    });

    return next.handle(reqClone).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponse) {
          return DefaultInterceptor.handleData(event);
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleError(err);
      })
    );
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleError(err: HttpErrorResponse) {
    const error = err.error;
    console.log(error);
    if (err.status === 401) {
      LocalStorageService.remove(ModelConsService.TOKEN_KEY);
      this.goTo(ModelConsService.LOGIN_URL);
    }
    if (err.status === 404) {
      this.goTo(ModelConsService.ERROR_404);
    }
    if (err.status === 500) {
      this.goTo(ModelConsService.ERROR_500);
    }
    return of(error.message);
  }
}
