import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from '../../../../Services/identity.service';

@Component({
    selector: 'app-add-role',
    standalone: true,
    templateUrl: './add-role.component.html',
    styleUrl: './add-role.component.css',
    imports: [FormlyModule, ReactiveFormsModule, FormlyBootstrapModule]
})
export class AddRoleComponent {
  @Output() sendData = new EventEmitter<string>();
  
  constructor(private router: Router, private toastr: ToastrService, private identityService: IdentityService) {}
  
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'role',
      type: 'input',
      templateOptions: {
        label: 'Role:',
        placeholder: 'Enter role',
        required: true
      }
    }
  ];
  onSubmit() {
    if (this.form.valid) {
      this.identityService.addRole(this.model).subscribe({
      next: () => {
        this.toastr.success("New role addedd successfully", "Success")
        this.model= {};
      },
      error: (err) => {
        this.toastr.error("New role is not addedd", "Error")
      },
      complete: () => this.sendData.emit('getData')
    });
    }
  }
}
