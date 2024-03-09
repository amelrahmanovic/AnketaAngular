import { Component } from '@angular/core';
import { NavComponent } from "../Shared/nav/nav.component";
import { CatalogSurveyService } from '../Services/catalog-survey.service';
import { CatalogSurvey } from '../Models/CatalogSurvey';
import { Question } from '../Models/Question';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../Services/question.service';
import { CatalogSurveyQuestionService } from '../Services/catalog-survey-question.service';
import { QuestionAnswerService } from '../Services/question-answer.service';
import { UserCatalogSurveryService } from '../Services/user-catalog-survery.service';
import { UsersQuestionsAnwers } from '../Models/UsersQuestionsAnwers';


@Component({
    selector: 'app-catalog-survey',
    standalone: true,
    templateUrl: './catalog-survey.component.html',
    styleUrl: './catalog-survey.component.css',
    imports: [NavComponent, CommonModule, FormsModule]
})
export class CatalogSurveyComponent {
  listCatalogSurveys: CatalogSurvey[] = [];

  newSurvey: boolean = false;
  newSurveyName: string= "";

  newQuestionSurveySelectedId: number = 0;
  newQuestion: boolean = false;
  newQuestionName: string= "";

  showQuestionsSelectedId: number = 0;
  showQuestion: boolean = false;
  listQuestion: Question[] = [];

  newQuestionAnswerForm: boolean = false;
  newQuestionAnswerQuestionId: number = 0;
  newQuestionAnswerName:string= "";
  newQuestionAnswer: boolean = true;

  newUser: boolean = false;
  newUserCatalogSurveyId: number = 0;
  newUserEmail: string= "";

  showUsers: boolean = false;
  showUsersCatalogSurveyId: number = 0;
  listUsers: UsersQuestionsAnwers[] = [];
  showUserAnswersForUserId: string = "";

  constructor(
    private serviceCatalogSurvey: CatalogSurveyService, 
    private serviceQuestion: QuestionService, 
    private serviceQuestionAnswerService: QuestionAnswerService, 
    private serviceCatalogSurveyQuestionService: CatalogSurveyQuestionService,
    private serviceuserCatalogSurveryService: UserCatalogSurveryService) {
    this.loadData();
  }
  loadData(){
    this.serviceCatalogSurvey.get().subscribe(
      (data: any) => {
        this.listCatalogSurveys = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  newSurveyFunction(show: boolean){
    this.newSurveyName="";
    if(show){this.newSurvey=show;}
    else{this.newSurvey=show;}
  }
  saveNewSurvey()
  {
    this.serviceCatalogSurvey.post(this.newSurveyName).subscribe(data=>
      (data: any) => {
      },
      (error) => {
        console.log(error);
      }
    )
    
    setTimeout(() => {
      // Your code to execute after x seconds
      this.newSurveyFunction(false);
      this.loadData();
    }, 50);
    
  }
  deleteSurvey(id: number){
    this.serviceCatalogSurvey.delete(id).subscribe(data=>
      (data: any) => {},
      (error) => {
        console.log(error);
      }
    )

    setTimeout(() => {
      // Your code to execute after x seconds
      this.newSurveyFunction(false);
      this.loadData();
    }, 50);
  }
  newUserAnswer(id: number, show: boolean) {
    this.newUserCatalogSurveyId = id;
    this.newUser = show;
  }
  saveUser(){
    this.serviceuserCatalogSurveryService.post(this.newUserEmail, this.newUserCatalogSurveyId).subscribe(data=>
      (data: any) => {
      },
      (error) => {
        console.log(error);
      }
    )
    
    setTimeout(() => {
      // Your code to execute after x seconds
      this.newUserAnswer(0, false);
      this.loadData();
    }, 50);
  }

  AddQuestion(id: number, show: boolean){
    this.newQuestionSurveySelectedId=id;
    if(show){this.newQuestion=show;}
    else{this.newQuestion=show;}
  }
  saveAddQuestion()
  {
    this.serviceQuestion.post(this.newQuestionSurveySelectedId, this.newQuestionName).subscribe(data=>
      (data: any) => {},
      (error) => {
        console.log(error);
      }
    )

    setTimeout(() => {
      // Your code to execute after x seconds
      this.AddQuestion(0, false);
      this.loadData();
    }, 50);
  }


  ShowQuestions(id: number, show: boolean)
  {
    this.showQuestionsSelectedId=id;
    this.showQuestion=show;

    this.serviceQuestion.get(id).subscribe(
      (data: any) => {
        this.listQuestion = data;
      },
      (error) => {
        console.log(error);
      }
    )

  }
  deleteQuestionAnswer(id: number){
    this.serviceQuestionAnswerService.delete(id).subscribe(data=>
      (data: any) => {},
      (error) => {
        console.log(error);
      }
    )

    setTimeout(() => {
      // Your code to execute after x seconds
      this.loadData();
      this.showQuestionsSelectedId=0;
      this.showQuestion=false;
      this.listQuestion = [];
    }, 50);
  }
  deleteCatalogSurveyQuestion(id: number){
    this.serviceCatalogSurveyQuestionService.delete(id, this.showQuestionsSelectedId).subscribe(data=>
      (data: any) => {},
      (error) => {
        console.log(error);
      }
    )
    this.showQuestion=false;
  }
  
  openNewQuestionAnswer(id: number, show: boolean){
    this.newQuestionAnswerForm=show;
    this.newQuestionAnswerQuestionId=id;
  }
  saveQuestionAnswer(){
    
    this.serviceQuestionAnswerService.post(this.newQuestionAnswerName, this.newQuestionAnswerQuestionId, this.newQuestionAnswer).subscribe(data=>
      (data: any) => {
      },
      (error) => {
        console.log(error);
      }
    )
    
    setTimeout(() => {
      // Your code to execute after x seconds
      this.serviceQuestion.get(this.newQuestionAnswerQuestionId).subscribe(
        (data: any) => {
          this.listQuestion = data;
        },
        (error) => {
          console.log(error);
        }
      )
    }, 50);

    this.newQuestionAnswerForm = false;
    this.newQuestionAnswerQuestionId = 0;
    this.newQuestionAnswerName = "";
    this.newQuestionAnswer = true;
    this.showQuestion=false;
  }

  showUser(id: number, show: boolean){
    this.showUsers=show;
    this.showUsersCatalogSurveyId=id;

    this.serviceuserCatalogSurveryService.get(id).subscribe(
      (data: any) => {
        this.listUsers = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  deleteUserCatalogSurvery(id: number){
    this.serviceuserCatalogSurveryService.delete(id, this.showUsersCatalogSurveyId).subscribe(
      (data: any) => {
      },
      (error) => {
        console.log(error);
      }
    )

    setTimeout(() => {
      // Your code to execute after x seconds
      this.serviceuserCatalogSurveryService.get(id).subscribe(
        (data: any) => {
          this.listUsers = data;
        },
        (error) => {
          console.log(error);
        }
      )//duplicated

    }, 50);
  }
  userShowAnswers(id: string){
    this.showUserAnswersForUserId=id;
  }
}
