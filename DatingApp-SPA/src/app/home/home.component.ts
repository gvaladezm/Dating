import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getCancelValue ($event){
    this.registerMode = $event;
  }

}
