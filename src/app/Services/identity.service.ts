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
  
  private getAccessTokenToken(): string | null {
    // Retrieve token from local storage or any other source
    return localStorage.getItem('accessToken');
  }
  getRolesFromJWT(): string[] {
    const token = this.getAccessTokenToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
        // Decode the token
        const decodedToken = this.jwtHelper.decodeToken(token);
        // Extract roles from the decoded token
        const rolesClaim = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (Array.isArray(rolesClaim)) {
            return rolesClaim;
        } else if (rolesClaim) {
            return [rolesClaim];
        }
    }
    return [];
}
  
  addRole(registerModel : any)
  {
    const role = {
      name: registerModel.role,
    };
    return this.http.post(this.uri+ "/authenticate/addrole", role);
  }
  getRoles()
  {
    return this.http.get(this.uri+ "/authenticate/getroles");
  }
  deleteRole(role: string)
  {
    return this.http.delete(this.uri+ "/authenticate/deleterole?role="+role);
  }
  deleteRoleUser(role: string, userId: string)
  {
    return this.http.delete(this.uri+ "/authenticate/deleteroleuser?userId="+userId+"&role="+role);
  }

  new(registerModel : any)
  {
    const newVM = {
      username: registerModel.username,
      email: registerModel.email,
      password: registerModel.password,
      userRoles: registerModel.userRoles,
      firstName: registerModel.firstName,
      lastName: registerModel.lastName,
      id: registerModel.id
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
  getUsers()
  {
    return this.http.get(this.uri+ "/authenticate/getusers");
  }
  getUserByUserId(userId: string)
  {
    return this.http.get(this.uri+ "/authenticate/getUserByUserId?userId="+userId);
  }
  deleteUser(userId: string)
  {
    return this.http.delete(this.uri+ "/authenticate/deleteuser/"+userId);
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
