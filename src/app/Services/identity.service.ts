import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  uri = environment.apiUrl;
  accessToken: any;
  
  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem('accessToken');
  }
  
  new(registerModel : NgForm)
  {
    const formData = registerModel.value;
    const newVM = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.uri+ "/authenticate/register", newVM, { headers: reqHeader });
  }
  login(credentials : NgForm)
  {
    const formData = credentials.value;
    const loginVM = {
      username: formData.username,
      password: formData.password,
    };
    return this.http.post(this.uri+ "/authenticate/login", loginVM);
  }
}
