import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  uri = environment.apiUrl+'/Question';
  accessToken: any;

  constructor(private http: HttpClient) { 
    this.accessToken = localStorage.getItem('accessToken');
  }
  get(id: number) 
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.get(`${this.uri}`+'/'+id, { headers: reqHeader });
  }
  post(catalogSurveyId: number, name: string)
  {
    const QuestionNewVM = {
      catalogSurveyId: catalogSurveyId,
      name: name
    };
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.uri, QuestionNewVM, { headers: reqHeader });
  }
}
