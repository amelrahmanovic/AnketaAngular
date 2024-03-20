import { Component } from '@angular/core';
import { NavComponent } from "../../Shared/nav/nav.component";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from '../../Services/identity.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, CommonModule, NavComponent]
})
export class LoginComponent {
    public invalidLogin: boolean = false;

    constructor(private router: Router, private toastr: ToastrService, private identityService: IdentityService) { }
    
    login = (form: NgForm) => {
      this.identityService.login(form).subscribe({
        next: (response) => {
          this.invalidLogin = false;
          const token = (<any>response).token;
          const refreshToken = (<any>response).refreshToken;
          localStorage.setItem("accessToken", token);
          localStorage.setItem("refreshToken", refreshToken);
          this.invalidLogin = false;
          this.router.navigate(["/"]);
        },
        error: (err) => {
          this.toastr.error("Invalid username or password.", "Error")
          // console.error(err)
          this.invalidLogin = true;
          setTimeout(() => {
            // Your code to execute after x seconds => 4*1000 = 4s
            this.invalidLogin = false;
          }, 4*1000);
        },
        // complete: () => console.info('Login complete')
      });
    }
  }
