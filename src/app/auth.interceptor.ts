import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { IdentityService } from './Services/identity.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
   const authService = inject(IdentityService);//Injected service do ....

   const userToken = localStorage.getItem("accessToken");
   const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
   });
   return next(modifiedReq);
};