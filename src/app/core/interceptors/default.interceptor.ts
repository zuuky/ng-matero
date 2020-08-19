import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModelConsService } from '@shared/services/modelcons.service';
import { LocalStorageService } from '@shared/services/storage.service';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private toastr: ToastrService) {
  }

  static handleData(event: HttpResponse<any>): Observable<any> {
    return of(event.clone({
      body: event.body,
    }));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url;
    let reqClone = req;
    if (!url.startsWith('https://') && !url.startsWith('http://') && !url.startsWith('./assets/') && !url.startsWith('assets/')) {
      url = environment.SERVER_URL + url;
      reqClone = req.clone({
        url, setHeaders: {
          Authorization: 'Bearer ' + LocalStorageService.get(ModelConsService.TOKEN_KEY).token,
        }, withCredentials: true,
      });
    }
    return next.handle(reqClone).pipe(
      mergeMap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return DefaultInterceptor.handleData(event);
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleError(err)),
    );
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleError(errEvent: HttpErrorResponse) {
    const error = errEvent.error;
    if (errEvent.status === 401) {
      LocalStorageService.remove(ModelConsService.TOKEN_KEY);
      this.goTo(ModelConsService.LOGIN_URL);
    } else if (errEvent.status === 404) {
      this.goTo(ModelConsService.ERROR_404);
    } else if (errEvent.status === 500) {
      this.goTo(ModelConsService.ERROR_500);
    } else {
      if (error instanceof HttpErrorResponse) {
        console.error('error', error);
        this.toastr.error(error.error.msg || `${error.status} ${error.statusText}`);
      }
    }
    return throwError(error);
  }
}
