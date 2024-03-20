import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { IdentityService } from '../../Services/identity.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit {
  constructor(private identityService: IdentityService) { }
  ngOnInit(): void {
    
    interval(200).subscribe(() => {
      this.myFunction();
    });

  }
  
  myFunction() 
  {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken)
    {
      if(!this.identityService.validateToken(accessToken))
      {
        this.identityService.refreshToken().subscribe(
          (data: any) => {
            // console.log(data);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
          },
          (error) => {
            // this.toastr.error('Error:'+error.error, 'Error', this.toastOptions);
          }
        )
        
      }
    }

    
    //console.log('Test');
    // Vaša funkcija koju želite pokrenuti svakih 10 minuta
  }
}
