import { Component, EventEmitter, Output } from '@angular/core';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from '../../../Services/identity.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormlyModule, ReactiveFormsModule, FormlyBootstrapModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  //username, email, password
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        minLength: 5,
        placeholder: 'Enter your username',
        required: true
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      }
    },
    
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true
      },
      validators: {
        password: {
          expression: (control: AbstractControl) => {
            const value = control.value;
            if (!value) return false; // ako nema vrednosti, lozinka nije validna
            // Minimalno 8 karaktera, bar jedno veliko slovo, bar jedan specijalni karakter i bar jedan broj
            const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
            return strongRegex.test(value);
          },
          message: 'Lozinka mora sadržati minimalno 8 karaktera, bar jedno veliko slovo, bar jedan specijalni karakter i bar jedan broj.'
        }
      }
    }

  ];
  @Output() sendData = new EventEmitter<string>();

  onSubmit() {
    if (this.form.valid) {
      this.identityService.new(this.model).subscribe({
      next: () => {
        this.toastr.success("New user registered successfully", "Success")
        this.router.navigate(['Login']);
      },
      error: (err) => {
        this.toastr.error("User already exists / register user failed", "Error")
      },
      complete: () => this.sendData.emit('getData')
    });
    }
  }
  
  constructor(private router: Router, private toastr: ToastrService, private identityService: IdentityService) { }
  

    // this.identityService.new(registerModel).subscribe({
    //   next: () => {
    //     this.toastr.success("New user registered successfully", "Success")
    //     this.router.navigate(['Login']);
    //   },
    //   error: (err) => {
    //     this.toastr.error("User already exists / register user failed", "Error")
    //     // console.error(err)
    //     setTimeout(() => {
    //       // Your code to execute after x seconds => 4*1000 = 4s
    //     }, 4*1000);
    //   },
    //   complete: () => console.info('Register complete')
    // });


}
