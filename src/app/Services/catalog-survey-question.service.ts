import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogSurveyQuestionService {
  uri = 'http://localhost:56115/api/CatalogSurveyQuestion';
  constructor(private http: HttpClient) { }
  delete(questionId: number, catalogSurveyId: number){
    return this.http.delete(`${this.uri}`+'/'+questionId+'?catalogSurveyId='+catalogSurveyId);
  }
}
