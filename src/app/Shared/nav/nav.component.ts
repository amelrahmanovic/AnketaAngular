import { CommonModule } from '@angular/common';
000000000import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from '../../Services/identity.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterModule, CommonModule ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  public isExpanded = false;
  public isEnableNewAdmin = false;
  
  roles: string[]= [];

  constructor(private router: Router, private toastr: ToastrService, private identityService: IdentityService) {
    identityService.enableNewAdmin().subscribe(
      (data: any) => {
        this.isEnableNewAdmin = data.enable;
      },
      (error) => {
        // this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
      }
    );
  }
  ngOnInit() {
    this.roles = this.identityService.getRolesFromJWT();
  }
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
