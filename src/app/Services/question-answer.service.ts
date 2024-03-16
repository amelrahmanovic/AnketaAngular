import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {
  uri = environment.apiUrl+'/QuestionAnswer';

  constructor(private http: HttpClient) {
  }
  delete(questionId: number){
    return this.http.delete(`${this.uri}`+'/'+questionId);
  }
  post(name: string, questionId: number, isCorrect: boolean)
  {
    const questionAnswerNewVM = {
      name: name,
      questionId: questionId,
      isCorrect: isCorrect
    };
    return this.http.post(this.uri, questionAnswerNewVM);
  }
}
