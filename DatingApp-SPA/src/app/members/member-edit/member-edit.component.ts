import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

@ViewChild('editForm', {static: true}) editForm: NgForm;
@HostListener('window:beforeunload', ['$event'])
user: User;
photoUrl = '';

unloadNotification($event: any){
  if(this.editForm.dirty){
    $event.returnValue = true;
  }
}

  constructor(private route: ActivatedRoute,
              private alertifyService: AlertifyService,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser(){

    const userId = this.authService.decodedToken.nameid;

    this.userService.updateUser(userId, this.user)
        .subscribe(result => {          
          this.editForm.reset(this.user);    
          this.alertifyService.success('User profile updated successfully!');
        }, error => {
          this.alertifyService.error(error);
        });

  }

  updateMainPhoto(photoUrl) {
    console.log(photoUrl);
    this.user.photoUrl = photoUrl;
  }

}
