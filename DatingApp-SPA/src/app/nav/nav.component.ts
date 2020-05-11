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
currUserPhotoUrl = '';


  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.usernameLogged = this.authService.decodedToken ? this.authService.decodedToken.unique_name : 'nadie logueado';
    this.authService.currentPhotoUrl
        .subscribe(currUserPhotoUrl => 
          this.currUserPhotoUrl = currUserPhotoUrl);

    console.log('oninit ', this.authService.decodedToken);
    console.log('oninit 2 ', this.authService.currentUser);
  }

  login(){
    this.authService.login(this.model)
      .subscribe(response => {
        this.alertifyService.success('Login successfully!');
        this.usernameLogged = this.authService.decodedToken.unique_name;
        this.currUserPhotoUrl = this.authService.currentUser.photoUrl;
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
    localStorage.removeItem('user');

    this.authService.decodedToken = null;
    this.authService.currentUser = null;

    this.alertifyService.message('logged out successfully');
    this.router.navigate(['/home']);
  }
  

}
