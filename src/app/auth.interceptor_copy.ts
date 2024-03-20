import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { IdentityService } from './Services/identity.service';
import { inject } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
   const authService = inject(IdentityService);//Injected service do ....

   const userToken = localStorage.getItem("accessToken");
   const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
   });
   
   return next(modifiedReq).pipe(
      //tap(resp => console.log('response', resp)), //Vraca response podatke

      catchError((error: HttpErrorResponse) => {
         //console.log('error.status');
         //console.log(error.status);
         //console.log(error);
         if (error && (error.status === 0 || error.status === 401)) {
            
            if(localStorage.getItem("accessToken") && localStorage.getItem("refreshToken"))
            {
               authService.refreshToken().subscribe(
                  (data: any) => {
                    console.log(data);
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("refreshToken", data.refreshToken);
   
                    const modifiedReq2 = req.clone({ headers: req.headers.set('Authorization', `Bearer ${data.accessToken}`), });
                    return next(modifiedReq2);
                  },
                  (error) => {
                    //console.log("Errrrrrr");
                    return next(modifiedReq);
                  }
               )
            }
            
         }
         return next(modifiedReq);
       })
   );

};
