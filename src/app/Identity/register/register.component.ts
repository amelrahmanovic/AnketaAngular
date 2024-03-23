import { Component } from '@angular/core';
import { NavComponent } from "../../Shared/nav/nav.component";
import { AddUserComponent } from "./add-user/add-user.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [NavComponent, AddUserComponent]
})
export class RegisterComponent {}
