import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {
  uri = environment.apiUrl+'/QuestionAnswer';
  accessToken: any;

  constructor(private http: HttpClient) { 
    this.accessToken = localStorage.getItem('accessToken');
  }
  delete(questionId: number){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.delete(`${this.uri}`+'/'+questionId, { headers: reqHeader });
  }
  post(name: string, questionId: number, isCorrect: boolean)
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    const questionAnswerNewVM = {
      name: name,
      questionId: questionId,
      isCorrect: isCorrect
    };
    return this.http.post(this.uri, questionAnswerNewVM, { headers: reqHeader });
  }
}
