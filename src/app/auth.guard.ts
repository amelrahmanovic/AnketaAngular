import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { IdentityService } from './Services/identity.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService, private identityService: IdentityService) {
  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
  {
    const token = localStorage.getItem("accessToken");

    if (token && !this.jwtHelper.isTokenExpired(token)) 
    {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) 
      {
        
        const userRoles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          
          if (route.data['roles'].includes('Admin') && userRoles.includes('Admin')) 
          {
            return true;
          } 
          else 
            if(route.data['roles'].includes('User') && userRoles.includes('User')) 
            {
              return true;
            } 
            else 
            {
              const isRefreshSuccess = await this.refreshingTokens(token);
              if (!isRefreshSuccess) 
              {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                this.toastr.error("Refresh token failed renew", "Error")
                this.router.navigate(["Login"]);
              }
              return false;
            }
      }
    }

    const isRefreshSuccess = await this.refreshingTokens(token);
    if (!isRefreshSuccess) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.toastr.error("Refresh token failed renew", "Error")
      this.router.navigate(["Login"]);
    }
    return isRefreshSuccess;
  }

  private async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return false;
    }
    
    const tokenModelVM = {
      accessToken: token,
      refreshToken: refreshToken,
    };

    let isRefreshSuccess: boolean;
    try {

      const response = await lastValueFrom(this.http.post(environment.apiUrl + "/authenticate/refresh-token", tokenModelVM));
      const newToken = (<any>response).accessToken;
      const newRefreshToken = (<any>response).refreshToken;
      localStorage.setItem("accessToken", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      this.toastr.success("Token renewed successfully", "Success")
      
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }

}