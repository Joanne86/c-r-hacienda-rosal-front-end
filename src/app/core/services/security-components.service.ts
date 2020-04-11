import { Injectable } from '@angular/core';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityComponentsService {

  constructor(private route: Router) { }

  validateLogin(){
    let userInfo = sessionStorage.getItem('userInfo');
    if(!userInfo){
      this.route.navigate(['/login']);
    }
  }
}
