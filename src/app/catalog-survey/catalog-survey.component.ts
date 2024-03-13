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
import { ToastrService, ToastrModule, IndividualConfig } from 'ngx-toastr';

import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';


@Component({
    selector: 'app-catalog-survey',
    standalone: true,
    templateUrl: './catalog-survey.component.html',
    styleUrl: './catalog-survey.component.css',
    imports: [NavComponent, CommonModule, FormsModule, ToastrModule, AgGridAngular]
})
export class CatalogSurveyComponent {
  // Row Data: The data to be displayed.
  // rowData = [
  //   { id: "1", name: "Test 1", created: "2024-03-06T21:51:47.2777722", questions: 2, users: 1  },
  //   { id: "2", name: "Test 2", created: "2024-03-06T21:51:47.2777722", questions: 1, users: 1  },
  //   { id: "3", name: "Test 3", created: "2024-03-06T21:51:47.2777722", questions: 2, users: 0  },
  //   { id: "4", name: "Test 4", created: "2024-03-06T21:51:47.2777722", questions: 2, users: 1  },
  //   { id: "5", name: "Test 5", created: "2024-03-06T21:51:47.2777722", questions: 1, users: 1  },
  //   { id: "6", name: "Test 6", created: "2024-03-06T21:51:47.2777722", questions: 2, users: 0  },
  //   { id: "7", name: "Test 7", created: "2024-03-06T21:51:47.2777722", questions: 2, users: 1  },
  //   { id: "8", name: "Test 8", created: "2024-03-06T21:51:47.2777722", questions: 1, users: 1  },
  //   { id: "9", name: "Test 9", created: "2024-03-06T21:51:47.2777722", questions: 2, users: 0  },
  //   { id: "10", name: "Test 10", created: "2024-03-06T21:51:47.2777722", questions: 2, users: 1  },
  //   { id: "11", name: "Test 11", created: "2024-03-06T21:51:47.2777722", questions: 1, users: 1  },
  //   { id: "12", name: "Test 12", created: "2024-03-06T21:51:47.2777722", questions: 2, users: 0  },
  // ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { headerName: "ID", field: "id", filter: true},
    { headerName: "Test", field: "name", filter: true },
    { headerName: "Created", field: "created", filter: true },
    { headerName: "Questions", field: "questions", filter: true },
    { headerName: "Users", field: "users", filter: true },
  ];
  
  pagination:boolean = true;
  paginationPageSize:number = 500;
  paginationPageSizeSelector = [5, 10, 100];
  filter:boolean = true;

  booleanConvert(arg0: string) {
    return Boolean(arg0);
  }
  toastOptions: Partial<IndividualConfig> = {
    progressBar: true,
    timeOut: 2000
  };
  
  waitTime: number = 200;

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
    private serviceuserCatalogSurveryService: UserCatalogSurveryService,
    private toastr: ToastrService) {
    this.loadData();

    // // EXAMPLE
    // this.toastr.success('Uspješno!', 'Success', this.toastOptions);
    // this.toastr.error('Uspješno!', 'Success');
    // this.toastr.info('Uspješno!', 'Success');
    // this.toastr.warning('Uspješno!', 'Success');
  }
  loadData(){
    this.serviceCatalogSurvey.get().subscribe(
      (data: any) => {
        this.listCatalogSurveys = data;
      },
      (error) => {
        this.toastr.error('Error:'+error, 'Error', this.toastOptions);
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
        this.toastr.error('Error:'+error, 'Error', this.toastOptions);
      }
    )
    
    setTimeout(() => {
      // Your code to execute after x seconds
      this.newSurveyFunction(false);
      this.loadData();
    }, this.waitTime);
    
  }
  deleteSurvey(id: number){
    this.serviceCatalogSurvey.delete(id).subscribe(data=>
      (data: any) => {},
      (error) => {
        this.toastr.error('Error:'+error, 'Error', this.toastOptions);
      }
    )

    setTimeout(() => {
      // Your code to execute after x seconds
      this.newSurveyFunction(false);
      this.loadData();
    }, this.waitTime);
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
        this.toastr.error('Error:'+error, 'Error', this.toastOptions);
      }
    )
    
    setTimeout(() => {
      // Your code to execute after x seconds
      this.newUserAnswer(0, false);
      this.loadData();
    }, this.waitTime);
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
        this.toastr.error('Error:'+error, 'Error', this.toastOptions);
      }
    )

    setTimeout(() => {
      // Your code to execute after x seconds
      this.AddQuestion(0, false);
      this.loadData();
    }, this.waitTime);
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
        this.toastr.error('Error:'+error, 'Error', this.toastOptions);
      }
    )

  }
  deleteQuestionAnswer(id: number){
    this.serviceQuestionAnswerService.delete(id).subscribe(data=>
      (data: any) => {},
      (error) => {
        this.toastr.error('Error:'+error, 'Error', this.toastOptions);
      }
    )

    setTimeout(() => {
      // Your code to execute after x seconds
      this.loadData();
      this.showQuestionsSelectedId=0;
      this.showQuestion=false;
      this.listQuestion = [];
    }, this.waitTime);
  }
  deleteCatalogSurveyQuestion(id: number){
    this.serviceCatalogSurveyQuestionService.delete(id, this.showQuestionsSelectedId).subscribe(data=>
      (data: any) => {},
      (error) => {
        this.toastr.error('Error:'+error, 'Error', this.toastOptions);
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
        this.toastr.error('Error:'+error, 'Error', this.toastOptions);
      }
    )
    
    setTimeout(() => {
      // Your code to execute after x seconds
      this.serviceQuestion.get(this.newQuestionAnswerQuestionId).subscribe(
        (data: any) => {
          this.listQuestion = data;
        },
        (error) => {
          this.toastr.error('Error:'+error, 'Error', this.toastOptions);
        }
      )
    }, this.waitTime);

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
      },
      (error) => {
        this.toastr.error('Error:'+error, 'Error', this.toastOptions);
      }
    )
  }
  deleteUserCatalogSurvery(id: number){
    this.serviceuserCatalogSurveryService.delete(id, this.showUsersCatalogSurveyId).subscribe(
      (data: any) => {
      },
      (error) => {
        this.toastr.error('Error:'+error, 'Error', this.toastOptions);
      }
    )

    setTimeout(() => {
      // Your code to execute after x seconds
      this.serviceuserCatalogSurveryService.get(id).subscribe(
        (data: any) => {
          this.listUsers = data;
        },
        (error) => {
          this.toastr.error('Error:'+error, 'Error', this.toastOptions);
        }
      )//duplicated

    }, this.waitTime);
  }
  userShowAnswers(id: string){
    this.showUserAnswersForUserId=id;
  }
}
