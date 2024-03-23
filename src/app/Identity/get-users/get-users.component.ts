import { Component } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { IdentityService } from '../../Services/identity.service';
import { IdentityUsers } from '../../Models/Identity/IdentityUsers';
import { NavComponent } from "../../Shared/nav/nav.component";
import { CommonModule } from '@angular/common';
import { AddUserComponent } from "../register/add-user/add-user.component";

@Component({
    selector: 'app-get-users',
    standalone: true,
    templateUrl: './get-users.component.html',
    styleUrl: './get-users.component.css',
    imports: [CommonModule, NavComponent, AddUserComponent]
})
export class GetUsersComponent {
  toastOptions: Partial<IndividualConfig> = {
    progressBar: true,
    timeOut: 2000
  };
  waitTime: number = 300;
  users: IdentityUsers[] = [];
  showAdd: boolean = false;

  constructor(private toastr: ToastrService, private identityService: IdentityService) 
  {
      this.getData();
  }
  
  getData() {
    this.identityService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
      }
   )
  }
  delete(userId: string)
  {
      this.identityService.deleteUser(userId).subscribe(
        (data: any) => {},
        (error) => {
          this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
        },
      )

      setTimeout(() =>{ 
        this.getData();
      }, this.waitTime);
      
  }
  receiveData(receivedData: string) {
    this.getData();
  }
}
