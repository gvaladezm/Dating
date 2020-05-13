import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

@Input() photos: Photo[];
@Output() getMemberPhotoChange = new EventEmitter<string>();

uploader: FileUploader;
hasBaseDropZoneOver: boolean;
hasAnotherDropZoneOver: boolean;
response: string;

baseURL = environment.apiUrl;

currentMainPhoto: Photo;

constructor(private authService: AuthService,
            private userService: UserService,
            private alertifyService: AlertifyService ){ }

ngOnInit(): any {
  this.initializeUploader();
}

initializeUploader() {
  this.uploader = new FileUploader({
    url: this.baseURL + 'users/' + this.authService.decodedToken.nameid + '/photos',
    authToken: 'Bearer ' + localStorage.getItem('token'),
    allowedFileType: ['image'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 10 * 1024 * 1024
  });

  this.uploader.onAfterAddingFile =  (file) => { file.withCredentials = false; };
  
  this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response){
        const res: Photo = JSON.parse(response);

        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.photos.push(photo);

        if (photo.isMain) {
          this.getMemberPhotoChange.emit(photo.url);
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }


      }
  };
}

public fileOverBase(e: any): void {
  this.hasBaseDropZoneOver = e;
}

public fileOverAnother(e: any): void {
  this.hasAnotherDropZoneOver = e;
}

setMainPhoto(photoId: number) {
  const userId = this.authService.decodedToken.nameid;
  this.userService.setMainPhotoForUser(userId, photoId)
  .subscribe(data => {
    this.alertifyService.success('Default photo changed successfully!');
    
    const currMainPhoto = this.photos.filter(p => p.isMain === true)[0];
    currMainPhoto.isMain = false;

    const newMainPhoto = this.photos.filter(p => p.id === photoId)[0];
    newMainPhoto.isMain = true;

    this.getMemberPhotoChange.emit(newMainPhoto.url);
    this.authService.changeMemberPhoto(newMainPhoto.url);

    this.authService.currentUser.photoUrl = newMainPhoto.url;

    localStorage.setItem('user', JSON.stringify(this.authService.currentUser));

  }, error => {
    this.alertifyService.error(error);
  });
}

deletePhoto(photoId: number) {

  this.alertifyService.confirm('Sure you want to delete this photo?',  () => {  
    this.userService.deletePhoto(this.authService.decodedToken.nameid, photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
      this.alertifyService.success('Photo deleted successfully!');
    }, error => {
      this.alertifyService.error(error);
    });
  });

}

}
