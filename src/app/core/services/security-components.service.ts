import { Injectable } from '@angular/core';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityComponentsService {

  constructor(private route: Router) { }

  validateLogin(type){
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo){
      this.route.navigate(['/login']);
    }else if(type !== userInfo.userType){
      this.route.navigate(['/login']);
    }
  }
}
