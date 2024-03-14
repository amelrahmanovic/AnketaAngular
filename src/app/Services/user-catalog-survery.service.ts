import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Test } from '../Models/Test';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCatalogSurveryService {
  uri = environment.apiUrl+'/UserCatalogSurvery';
  constructor(private http: HttpClient) { }
  post(Email: string, CatalogSurveyId: number)
  {
    const QuestionNewVM = {
      Email: Email,
      CatalogSurveyId: CatalogSurveyId
    };
    return this.http.post(this.uri, QuestionNewVM);
  }
  get(id: number) 
  {
    return this.http.get(`${this.uri}`+'/'+id);
  }
  getTersts(id: number) 
  {
    return this.http.get(`${this.uri}`+'/user/'+id);
  }
  delete(userId: number, catalogSurveyId: number){
    return this.http.delete(`${this.uri}`+'/'+userId+'?catalogSurveyId='+catalogSurveyId);
  }
  postUserQuestions(tests: Test[])
  {
    return this.http.post(this.uri+'/user', tests);
  }
}
