import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = environment.apiUrl+'/User';
  accessToken: any;

  constructor(private http: HttpClient) { 
    this.accessToken = localStorage.getItem('accessToken');
  }
  
  get(email: string) 
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.get(`${this.uri}`+'/'+email, { headers: reqHeader });
  }
}
