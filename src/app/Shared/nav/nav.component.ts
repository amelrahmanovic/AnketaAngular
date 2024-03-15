import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterModule, CommonModule ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  public isExpanded = false;

  constructor(private router: Router, private toastr: ToastrService) { }
  collapse() {
    this.isExpanded = false;
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  isUserAuthenticated() {
    const token: string | null = localStorage.getItem("accessToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
  public logOut(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.toastr.success("Logout success.", "Logout")
    this.router.navigate(["Login"]);
  }

}
