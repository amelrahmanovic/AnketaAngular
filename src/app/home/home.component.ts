import { Component } from '@angular/core';
import { NavComponent } from "../Shared/nav/nav.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavComponent]
})
export class HomeComponent {

}
