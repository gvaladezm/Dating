import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }
baseUrl = `${environment.apiUrl}auth/`;

jwtHelper = new JwtHelperService();
decodedToken: any;
currentUser: User;
photoUrl = new BehaviorSubject<string>('../../../assets/user.jpg');
currentPhotoUrl = this.photoUrl.asObservable();

changeMemberPhoto (photoUrl: string){
  if (!photoUrl){
    return;
  }

  this.photoUrl.next(photoUrl);
}

login(model: any){
  return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;

        if (user){
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;

          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.changeMemberPhoto(this.currentUser.photoUrl);

        }
      })
    );
}

register (model: User){
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}



}
