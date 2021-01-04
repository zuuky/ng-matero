import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { MtxDialog } from '@ng-matero/extensions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { delEmptyKey } from '@shared';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private injector: Injector) {
  }

  private get httpClient() {
    return this.injector.get(HttpClient);
  }

  private get dialog() {
    return this.injector.get(MtxDialog);
  }

  private get snackbar() {
    return this.injector.get(MatSnackBar);
  }

  _isLoading = new BehaviorSubject<boolean>(false);

  private toHttpParam(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      const record = delEmptyKey(params);
      Object.keys(record).forEach(key => {
        httpParams = httpParams.set(key, record[key]);
      });
    }
    return httpParams;
  }

  get(route: string, params?: Record<string, any>, callback?: (res) => void) {
    this._isLoading.next(true);
    return this.httpClient.get<any>(route, { params: this.toHttpParam(delEmptyKey(params)) }).subscribe(
      (res: any) => {
        callback(res);
        this.snackbar.open('success');
        this._isLoading.next(false);
      },
      (error: any) => {
        this._isLoading.next(false);
        this.dialog.alert(error);
      },
      () => {
        this._isLoading.next(false);
      },
    );
  }

  upload(route: string, formData: FormData, callback?: (res) => void, params?: Record<string, any>) {
    return this.httpClient
      .post(route, formData, {
        reportProgress: true,
        observe: 'events',
        params: this.toHttpParam(params),
      }).pipe(map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            return `begin upload`;
          // 正在上传
          case HttpEventType.UploadProgress:
            return `${Math.round((100 * event.loaded) / event.total)}%`;
          // 上传完毕
          case HttpEventType.Response:
            // 回调
            if (callback) {
              callback(event.body);
            }
            return 'complete upload';
          default:
            return `uploading`;
        }
      }));
  }


  post(route: string, params?: any, callback?: (res) => void) {
    this._isLoading.next(true);
    return this.httpClient.post<any>(route, delEmptyKey(params), { headers: { contentType: 'application/x-www-form-urlencoded' } }).subscribe(
      (res: any) => {
        this._isLoading.next(false);
        callback(res);
        this.snackbar.open('success');
      },
      (error: any) => {
        this._isLoading.next(false);
        this.dialog.alert(error);
      },
      () => {
        this._isLoading.next(false);
      },
    );
  }

  download(route: string, filename?: string): void {
    this.httpClient.get(route, { responseType: 'blob' as 'json' }).subscribe(
      (response: any) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([response], { type: response.type }));
        if (filename) {
          downloadLink.setAttribute('download', filename);
        }
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.parentNode.removeChild(downloadLink);
      },
      (error) => {
        this.dialog.alert(JSON.stringify(error));
      },
    );
  }
}
