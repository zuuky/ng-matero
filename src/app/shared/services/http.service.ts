import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private injector: Injector) {
  }

  private get httpClient() {
    return this.injector.get(HttpClient);
  }

  get(route: string): Observable<any> {
    return this.httpClient.get(route);
  }

  upload(route: string, formData: FormData): Observable<any> {
    return this.httpClient.post(route, formData);
  }

  post(route: string, datas: any): Observable<any> {
    return this.httpClient.post(route, datas, {headers: {contentType: 'application/x-www-form-urlencoded'}});
  }

  download(route: string, filename: string = null): void {
    this.httpClient.get(route, {responseType: 'blob' as 'json'}).subscribe(
      (response: any) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([response], {type: response.type}));
        if (filename)
          downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.parentNode.removeChild(downloadLink);
      }
    );
  }
}
