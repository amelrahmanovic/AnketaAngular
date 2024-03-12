import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:56115/api/User';
  constructor(private http: HttpClient) { }
  
  get(email: string) 
  {
    return this.http.get(`${this.uri}`+'/'+email);
  }
}
