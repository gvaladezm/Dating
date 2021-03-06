import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl + 'users'); //, httpOptions);
}

getUser(id): Observable<User>{
  return this.http.get<User>(this.baseUrl + 'users/' + id); //, httpOptions);
}

updateUser(id: number, user: User){
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

setMainPhotoForUser(userId: number, photoId: number){
  return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + photoId + '/setMain', {});
}

deletePhoto(userId: number, photoId: number){
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + photoId);
}

}
