import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from '../../Services/identity.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../../Shared/nav/nav.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [FormsModule, CommonModule, NavComponent]
})
export class RegisterComponent {
  public invalidRegister = false;

  constructor(private router: Router, private toastr: ToastrService, private identityService: IdentityService) { }
  
  public register = (form: NgForm) => {
    
    const registerModel = form;

    this.identityService.new(registerModel).subscribe({
      next: () => {
        this.invalidRegister = false;
        this.toastr.success("New user registered successfully", "Success")
        this.router.navigate(['Login']);
      },
      error: (err) => {
        this.toastr.error("User already exists / register user failed", "Error")
        // console.error(err)
        this.invalidRegister = true;
        setTimeout(() => {
          // Your code to execute after x seconds => 4*1000 = 4s
          this.invalidRegister = false;
        }, 4*1000);
      },
      complete: () => console.info('Register complete')
    });

  }
}
