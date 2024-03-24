import { Component } from '@angular/core';
import { NavComponent } from "../../../Shared/nav/nav.component";
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { IdentityService } from '../../../Services/identity.service';
import { CommonModule } from '@angular/common';
import { Role } from '../../../Models/Identity/Roles';
import { AddRoleComponent } from "./add-role/add-role.component";

@Component({
    selector: 'app-get-roles',
    standalone: true,
    templateUrl: './get-roles.component.html',
    styleUrl: './get-roles.component.css',
    imports: [CommonModule, NavComponent, AddRoleComponent]
})
export class GetRolesComponent {
    roles: Role[] = [];
    toastOptions: Partial<IndividualConfig> = {
        progressBar: true,
        timeOut: 2000
    };
    waitTime: number = 300;
    data: string | undefined;
    showAdd: boolean = false;
    
    constructor(private toastr: ToastrService, private identityService: IdentityService) 
    {
        this.getData();
    }
    delete(name: string)
    {
      this.identityService.deleteRole(name).subscribe(
        (data: any) => {},
        (error) => {
          this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
        },
      )

      setTimeout(() =>{ 
        this.getData();
      }, this.waitTime);
      
    }
    getData() {
      this.identityService.getRoles().subscribe(
        (data: any) => {
          this.roles = data;
        },
        (error) => {
          this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
        }
      )
    }
    receiveData(receivedData: string) {
      this.showAdd=false;
      this.getData();
    }
}
