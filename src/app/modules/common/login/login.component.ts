import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/core/models/Session.model';
import { RepositoryService } from 'src/app/core/services/repository.service';
import { UserType } from 'src/app/core/enums/UserType.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Session = new Session();
  fields;
  button;
  loading;
  showText: string;

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
    this.loading = true;
    this.requestService.getUser(this.user.user).then(response =>{
      sessionStorage.setItem('userInfo', JSON.stringify(response));
      console.log('response: ', response);
      this.loading =false;

      if(response){
        this.validateUser(response);
      }else{
        this.showText= 'Usuario y/o contraseña incorrectos';
      }
    }, error =>{
      this.loading =false;
    });
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
