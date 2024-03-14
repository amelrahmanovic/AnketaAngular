import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  uri = environment.apiUrl+'/Question';
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
