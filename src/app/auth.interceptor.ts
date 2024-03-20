import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { IdentityService } from './Services/identity.service';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

//let isTokenRefreshed = false;

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
   const authService = inject(IdentityService);//Injected service do ....
   const router = inject(Router);//Injected service do ....

   let userToken = localStorage.getItem("accessToken");
   if(userToken)
   {
      let result = authService.validateToken(userToken);
      if(result)
      {
         // console.log("Token postoji i nije istekao");
         const modifiedReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${userToken}`),})
         req=modifiedReq;
      }
      // else ////Ne odradi dovoljno brzo lokalni storage pa je prebaceno u timer.component.ts
      // {
      //    console.log("Token postoji i istekao je");

      //    // Osvježavanje tokena samo ako nije već osvježen
      //    if (!isTokenRefreshed) {
      //       isTokenRefreshed = true;

      //       authService.refreshToken().pipe(
      //          switchMap((data: any) => {
      //             console.log("Dobijen novi access token");
      //             localStorage.setItem("accessToken", data.accessToken);
      //             localStorage.setItem("refreshToken", data.refreshToken);
      //             console.log("Token postoji i nije istekao");
      //             const modifiedReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${data.accessToken}`),})
      //             req=modifiedReq;
      //             return next(req);
      //          }),
      //          catchError((error) => {
      //             console.log("Nastala greska pri dobivanju novof access tokena");
      //             //  this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
      //             return throwError(error);
      //          }),
      //          take(1) // Završi pretplatu nakon jedne emisije
      //       ).subscribe(() => {
      //          isTokenRefreshed = false; // Resetiranje za sljedeći zahtjev
      //       });
      //    }
      // }
   }

   return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
         // Handle the error here
         console.error('error occurred:', error);

         if(error.name==="HttpErrorResponse" && error.statusText==="Unknown Error" && error.url?.indexOf("/api/authenticate/refresh-token"))
         {
            localStorage.clear();
            router.navigate(["Login"]);
         }
         //throw error as per requirement
         return throwError(error);
      })
   );
};