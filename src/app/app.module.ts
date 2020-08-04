import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { ThemeModule } from '@theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';

import { DefaultInterceptor, StartupService, TranslateLangService } from '@core';
import { FormlyModule } from '@ngx-formly/core';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import 'moment/locale/zh-cn';

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function TranslateLangServiceFactory(translateLangService: TranslateLangService) {
  return () => translateLangService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ThemeModule,
    RoutesModule,
    FormlyModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: TranslateLangServiceFactory,
      deps: [TranslateLangService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'zh-cn' },
    {
      provide: DateAdapter,
      useFactory: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
