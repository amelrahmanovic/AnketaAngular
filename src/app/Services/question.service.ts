import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  uri = 'http://localhost:56115/api/Question';
  constructor(private http: HttpClient) { }
  get(id: number) 
  {
    return this.http.get(`${this.uri}`+'/'+id);
  }
  post(catalogSurveyId: number, name: string)
  {
    const QuestionNewVM = {
      catalogSurveyId: catalogSurveyId,
      name: name
    };
    return this.http.post(this.uri, QuestionNewVM);
  }
}
