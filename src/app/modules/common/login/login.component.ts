import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/core/models/Session.model';
import { RepositoryService } from 'src/app/core/services/repository.service';
import { UserType } from 'src/app/core/enums/UserType.enum';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:Session = new Session();
  fields;
  button;

  constructor(private requestService: RepositoryService, private route: Router) { }

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
    if(this.user.user === this.user.password){
      this.requestService.getUser(this.user.user).then(response =>{
        sessionStorage.setItem('userInfo', JSON.stringify(response));
        this.validateUser(response);
      }, error =>{
        console.log('occurrio un error');
        // abre el modal
      });
    }else{
      //abre el modal
    }
    console.log('ingresa');
  }
  validateUser(userResponse){
    if(userResponse.userType === UserType.ADMINISTRADOR){
      this.route.navigate(['/admin-home/publish']);
    }else{
      this.route.navigate(['/resident-home/news']); 
    }
  }

}
