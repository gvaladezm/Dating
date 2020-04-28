import { Component, OnInit } from '@angular/core';

import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
users: User[];

  constructor(private userService: UserService,
              private alertifyService: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
   // this.loadUsers();
   this.route.data.subscribe(data => {
     console.log(data);
      this.users = data.users;
    });
  }


  // loadUsers(){
  //   this.userService.getUsers()
  //   .subscribe(
  //     (data: User[]) => {
  //       this.users = data;
  //     },
  //     error => {
  //       this.alertifyService.error(error);
  //     }
  //   );

  // }

}
