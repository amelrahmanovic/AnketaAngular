import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCatalogSurveryService {
  uri = 'http://localhost:56115/api/UserCatalogSurvery';
  constructor(private http: HttpClient) { }
  post(Email: string, CatalogSurveyId: number)
  {
    const QuestionNewVM = {
      Email: Email,
      CatalogSurveyId: CatalogSurveyId
    };
    return this.http.post(this.uri, QuestionNewVM);
  }
}
