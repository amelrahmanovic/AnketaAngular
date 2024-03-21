import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
import { Observable, lastValueFrom } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private uri = environment.apiUrl;
  public jwtHelper: JwtHelperService = new JwtHelperService();
  
  constructor(private http: HttpClient) {
  }
  
  new(registerModel : any)
  {
    console.log(registerModel);
    const newVM = {
      username: registerModel.username,
      email: registerModel.email,
      password: registerModel.password,
    };
    return this.http.post(this.uri+ "/authenticate/register", newVM);
  }
  login(credentials : NgForm)
  {
    const formData = credentials.value;
    if(formData.rememberMe === "") {
      formData.rememberMe = false;
    }
    else{
      if(formData.rememberMe === true) {
        formData.rememberMe = true;
      }
      else{
        formData.rememberMe = false;
      }
    }
    const loginVM = {
      username: formData.username,
      password: formData.password,
      rememberMe: formData.rememberMe,
    };
    return this.http.post(this.uri+ "/authenticate/login", loginVM);
  }
  refreshToken() {

    const tokenModelVM = {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    };

    return this.http.post(environment.apiUrl + "/authenticate/refresh-token", tokenModelVM);
  }
  enableNewAdmin() {
    return this.http.post(environment.apiUrl + "/authenticate/EnableNew", null);
  }
  refreshTokenRnd() {
    return this.http.get("/authenticate/refresh-token");
  }
  refreshTokenInService(): Observable<any> {
    
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !this.jwtHelper.isTokenExpired(accessToken)) {
      const tokenModelVM = 
      {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
      };
      return this.http.post<any>(environment.apiUrl + "/authenticate/refresh-token", tokenModelVM);
    }

    const tokenModelVM = 
    {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
    return this.http.post<any>(environment.apiUrl + "/authenticate/refresh-token", tokenModelVM);
  }
  validateToken(token: string)
  {
    if (token && !this.jwtHelper.isTokenExpired(token)) 
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
