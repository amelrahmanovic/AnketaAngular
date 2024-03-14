import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogSurveyService {
  uri = environment.apiUrl+'/CatalogSurvey';
  accessToken: any;

  constructor(private http: HttpClient) { 
    this.accessToken = localStorage.getItem('accessToken');
  }
  
  get() 
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.get(`${this.uri}`, { headers: reqHeader });
  }
  post(name: string)
  {
    const surveyVM = {
      name: name
    };
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.uri, surveyVM, { headers: reqHeader });
  }
  delete(id: number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.delete(`${this.uri}`+'/'+id, { headers: reqHeader });
  }
}
