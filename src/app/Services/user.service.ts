import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = environment.apiUrl+'/User';

  constructor(private http: HttpClient) { }
  
  get(email: string) 
  {
    return this.http.get(`${this.uri}`+'/'+email);
  }
}
