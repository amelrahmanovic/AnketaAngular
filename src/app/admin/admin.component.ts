import { Component } from '@angular/core';
import { NavComponent } from "../Shared/nav/nav.component";

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [NavComponent]
})
export class AdminComponent {

}
