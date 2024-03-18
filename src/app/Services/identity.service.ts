import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private uri = environment.apiUrl;
  
  constructor(private http: HttpClient) {
  }
  
  new(registerModel : NgForm)
  {
    const formData = registerModel.value;
    const newVM = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
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
}
