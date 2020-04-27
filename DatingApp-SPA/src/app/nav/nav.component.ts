import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
usernameLogged = '';


  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private router: Router) {                
  }

  ngOnInit() {
    this.usernameLogged = this.authService.decodedToken ? this.authService.decodedToken.unique_name : 'nadie logueado';
    console.log(this.usernameLogged);
  }

  login(){
    this.authService.login(this.model)
      .subscribe(response => {
        this.alertifyService.success('Login successfully!');
        this.usernameLogged = this.authService.decodedToken.unique_name;
      }, error => {
        this.alertifyService.error(error);
      },() => {
        this.router.navigate(['/members']);
      });
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertifyService.message('logged out successfully');
    this.router.navigate(['/home']);
  }
  

}
