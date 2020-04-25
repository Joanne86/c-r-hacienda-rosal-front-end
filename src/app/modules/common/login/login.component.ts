import { Component, OnInit } from '@angular/core';
import { CredentialDto } from 'src/app/core/models/Credential.model';
import { RepositoryService } from 'src/app/core/services/repository.service';
import { UserType } from 'src/app/core/enums/UserType.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentialDto: CredentialDto = new CredentialDto();
  fields;
  button;
  loading;
  showText: string;

  constructor(private requestService: RepositoryService, private route: Router) { }

  ngOnInit() {
    this.button = document.getElementById('btn-start');
    sessionStorage.clear();
  }

  validateFields(){
    this.fields = false;
    this.button.className = 'btn-login-block';
    if(this.credentialDto.user && this.credentialDto.password){
      this.fields = true;
      this.button.className = 'btn-login';
    }
    return this.fields;
  }

  start() {
    this.loading = true;
    this.requestService.getUser(this.credentialDto).then(response =>{
      sessionStorage.setItem('userInfo', JSON.stringify(response));
      console.log('response: ', response);
      this.loading =false;

      if(response){
        this.validateUser(response);
      }else{
        this.showText= 'Usuario y/o contraseña incorrectos';
      }
    }, error =>{
      alert('Ocurrio un error al iniciar la sesión intentelo de nuevo mas tarde.');
      this.loading =false;
    });
  }
  validateUser(userResponse){
    if(userResponse.userType === UserType.ADMINISTRADOR){
      this.route.navigate(['/admin-home/publish']);
    }else{
      this.route.navigate(['/resident-home/news']);
    }
  }

}
