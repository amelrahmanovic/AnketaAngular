import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogSurveyQuestionService {
  uri = environment.apiUrl+'/CatalogSurveyQuestion';
  accessToken: any;

  constructor(private http: HttpClient) { 
    this.accessToken = localStorage.getItem('accessToken');
  }

  delete(questionId: number, catalogSurveyId: number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.delete(`${this.uri}`+'/'+questionId+'?catalogSurveyId='+catalogSurveyId, { headers: reqHeader });
  }
}
