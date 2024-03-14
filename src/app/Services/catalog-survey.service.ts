import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogSurveyService {
  uri = environment.apiUrl+'/CatalogSurvey';
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
