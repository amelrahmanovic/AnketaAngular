import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogSurveyQuestionService {
  uri = environment.apiUrl+'/CatalogSurveyQuestion';

  constructor(private http: HttpClient) { }

  delete(questionId: number, catalogSurveyId: number){
    return this.http.delete(`${this.uri}`+'/'+questionId+'?catalogSurveyId='+catalogSurveyId);
  }
}
