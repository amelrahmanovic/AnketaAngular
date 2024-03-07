import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogSurveyService {
  uri = 'http://localhost:56115/api/CatalogSurvey';
  constructor(private http: HttpClient) { }
  
  get() 
  {
    return this.http.get(`${this.uri}`);
  }
  post(name: string)
  {
    const surveyVM = {
      name: name
    };
    return this.http.post(this.uri, surveyVM);
  }
  delete(id: number){
    return this.http.delete(`${this.uri}`+'/'+id);
  }
}
