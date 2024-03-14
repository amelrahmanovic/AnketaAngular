import { Component } from '@angular/core';
import { NavComponent } from "../Shared/nav/nav.component";
import { FormsModule } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { User } from '../Models/User';
import { QuestionAnswerUserVM, Test, UserQuestionAnswerVM } from '../Models/Test';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserCatalogSurveryService } from '../Services/user-catalog-survery.service';

@Component({
    selector: 'app-test',
    standalone: true,
    templateUrl: './test.component.html',
    styleUrl: './test.component.css',
    imports: [NavComponent, FormsModule, CommonModule]
})
export class TestComponent {
    waitTime: number = 100;
    toastOptions: Partial<IndividualConfig> = {
        progressBar: true,
        timeOut: 2000
    };
    
    showTest: boolean = true;
    newUserEmail: string= "";
    newUserId: number= 0;
    userFound: boolean = false;
    user: User | undefined;
    tests: Test[] = [];
    catalogSurveyId: number = 0;
    catalogSurveyIndex: number = 0;
    question: number = -1;
    width: number = 0;
    questionAnswerUserVMId: number = 0

    constructor(private userService: UserService, private toastr: ToastrService, private userCatalogSurveryService: UserCatalogSurveryService) {}

    checkUser(){
        if(this.newUserEmail==="")
            var user = "!@#$$%";
        else
            var user = this.newUserEmail;

        this.userService.get(user).subscribe(
            (data: any) => {
              this.user = data;
              this.newUserId=data?.id;
              
              if (data?.id !== undefined) {
                this.userCatalogSurveryService.getTersts(data?.id).subscribe(
                    (data2: any) => {
                      this.tests = data2;
                      console.log(data2);
                    },
                    (error) => {
                        this.toastr.error('Error: '+error.statusText, 'Error', this.toastOptions);
                    }
                )
            }
            else{
                this.toastr.error('Error: User not found!', 'Error', this.toastOptions);
            }
            },
            (error) => {
                this.toastr.error('Error: '+error.statusText, 'Error', this.toastOptions);
            }
        );
    }
    StartTest(catalogSurveyId: number, index: number){
        this.catalogSurveyId = catalogSurveyId;
        this.catalogSurveyIndex=index;
        this.question = 0;
        this.showTest = false;
        this.questionAnswerUserVMId=0;
        this.width = ((this.questionAnswerUserVMId+1)/(this.tests[this.catalogSurveyIndex].userQuestionAnswerVMs.length))*100;
        this.tests[this.catalogSurveyIndex].testDone = 'true';

        this.tests[this.catalogSurveyIndex].userQuestionAnswerVMs[this.questionAnswerUserVMId].questionAnswerUserVM.forEach(key =>{
            key.userAnswer=false;
        });
    }
    nextQuestion(question: number){
        this.questionAnswerUserVMId += question;
        this.width = ((this.questionAnswerUserVMId+1)/(this.tests[this.catalogSurveyIndex].userQuestionAnswerVMs.length))*100;
    }
    completed(){
        this.tests[this.catalogSurveyIndex].userQuestionAnswerVMs[this.questionAnswerUserVMId].questionAnswerUserVM.forEach(key =>{
            key.userAnswer=String(key.userAnswer);
        });
        console.log("tests");
        console.log(this.tests);

        this.showTest = true;
        this.question = -1;
        this.width = 0;
        this.catalogSurveyId=0;
        this.catalogSurveyIndex= 0;
        this.questionAnswerUserVMId = 0;

        setTimeout(() => {
            // Your code to execute after x seconds
            this.userCatalogSurveryService.postUserQuestions(this.tests).subscribe(
                (data: any) => {
                //   this.user = data;
                    this.userCatalogSurveryService.getTersts(this.newUserId).subscribe(
                        (data2: any) => {
                        this.tests = data2;
                        console.log(data2);
                        },
                        (error) => {
                            this.toastr.error('Error2: '+error.statusText, 'Error', this.toastOptions);
                        }
                    )
                },
                (error) => {
                    this.toastr.error('Error: '+error.statusText, 'Error', this.toastOptions);
                }
            );
          }, this.waitTime);

        

        this.toastr.success('The test was completed successfully.', 'Success', this.toastOptions);
    }
    changeAnswer(questionAnswerUserVM: QuestionAnswerUserVM){
        questionAnswerUserVM.userAnswer=String(questionAnswerUserVM.userAnswer);
    }
}
