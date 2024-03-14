import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Test } from '../Models/Test';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCatalogSurveryService {
  uri = environment.apiUrl+'/UserCatalogSurvery';
  accessToken: any;
  
  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem('accessToken');
  }
  post(Email: string, CatalogSurveyId: number)
  {
    const QuestionNewVM = {
      Email: Email,
      CatalogSurveyId: CatalogSurveyId
    };
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.uri, QuestionNewVM, { headers: reqHeader });
  }
  get(id: number) 
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.get(`${this.uri}`+'/'+id, { headers: reqHeader });
  }
  getTersts(id: number) 
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.get(`${this.uri}`+'/user/'+id, { headers: reqHeader });
  }
  delete(userId: number, catalogSurveyId: number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.delete(`${this.uri}`+'/'+userId+'?catalogSurveyId='+catalogSurveyId, { headers: reqHeader });
  }
  postUserQuestions(tests: Test[])
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.uri+'/user', tests, { headers: reqHeader });
  }
}
