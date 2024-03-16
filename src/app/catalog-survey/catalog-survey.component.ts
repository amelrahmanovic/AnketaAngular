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
import { ColDef, ValueGetterParams  } from 'ag-grid-community'; // Column Definition Type Interface
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
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { headerName: "ID", field: "id", filter: true, hide: true},
    { headerName: "Test", field: "name", filter: true },
    { headerName: "Created", field: "created", filter: true },
    { headerName: "Questions", field: "questions", filter: true },
    { headerName: "Users", field: "users", filter: true },
  ];
  gridOptions = {
    onRowClicked: this.onRowClicked.bind(this)
  };
  onRowClicked(event: any) {
    this.SurveySelectedId=event.data.id;
    this.newQuestionUsers = event.data.users;
    this.newQuestionNameShowForm = event.data.name
    // console.log('Row clicked. ID:', event.data);
  }
  
  pagination:boolean = true;
  paginationPageSize:number = 500;
  paginationPageSizeSelector = [5, 10, 100];
  filter:boolean = true;

  booleanConvert(arg0: string) {
    return Boolean(arg0);
  }
  stringConvert(arg0: boolean) {
    return String(arg0);
  }
  toastOptions: Partial<IndividualConfig> = {
    progressBar: true,
    timeOut: 2000
  };
  
  waitTime: number = 200;

  listCatalogSurveys: CatalogSurvey[] = [];

  newSurvey: boolean = false;
  newSurveyName: string= "";

  SurveySelectedId: number = 0;

  newQuestionSurveySelectedId: number = 0;
  newQuestionUsers: number = 0;
  newQuestion: boolean = false;
  newQuestionName: string= "";
  newQuestionNameShowForm: string= "";

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
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
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
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
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
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
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
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
      }
    )
    
    setTimeout(() => {
      // Your code to execute after x seconds
      this.newUserAnswer(0, false);
      this.loadData();
    }, this.waitTime);
  }
  hideSurvey(newQuestionSurveySelectedId: number){
    this.SurveySelectedId = 0;
    this.newQuestionUsers = 0;
    this.newQuestionNameShowForm = ""
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
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
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
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
      }
    )

  }
  deleteQuestionAnswer(id: number){
    this.serviceQuestionAnswerService.delete(id).subscribe(data=>
      (data: any) => {},
      (error) => {
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
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
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
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
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
      }
    )
    
    setTimeout(() => {
      // Your code to execute after x seconds
      this.serviceQuestion.get(this.newQuestionAnswerQuestionId).subscribe(
        (data: any) => {
          this.listQuestion = data;
        },
        (error) => {
          this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
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
        // console.log(data);
      },
      (error) => {
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
      }
    )
  }
  deleteUserCatalogSurvery(id: number){
    this.serviceuserCatalogSurveryService.delete(id, this.showUsersCatalogSurveyId).subscribe(
      (data: any) => {
      },
      (error) => {
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
      }
    )

    setTimeout(() => {
      // Your code to execute after x seconds
      this.serviceuserCatalogSurveryService.get(id).subscribe(
        (data: any) => {
          this.listUsers = data;
        },
        (error) => {
          this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
        }
      )//duplicated

    }, this.waitTime);
  }
  userShowAnswers(id: string){
    this.showUserAnswersForUserId=id;
  }
}
