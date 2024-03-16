import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), //If add service and use http: HttpClient
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    provideHttpClient(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
