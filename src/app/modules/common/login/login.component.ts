import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  fields;
  button;

  constructor() { }

  ngOnInit() {
    this.button = document.getElementById('btn-start');
  }

  login() {

  }

  validateFields(){
    this.fields = false;
    this.button.className = 'btn-login-block';
    if(this.user.user && this.user.password){
      this.fields = true;
      this.button.className = 'btn-login';
    }
    return this.fields;
  }

  start() {
    console.log('ingresa');
  }

}
