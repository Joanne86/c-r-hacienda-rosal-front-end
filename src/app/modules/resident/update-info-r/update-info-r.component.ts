import { Component, OnInit } from '@angular/core';
import {ResidentDto} from '../../../core/models/ResidentDto.model';

@Component({
  selector: 'app-update-info-r',
  templateUrl: './update-info-r.component.html',
  styleUrls: ['./update-info-r.component.css']
})
export class UpdateInfoRComponent implements OnInit {
  residentDto: ResidentDto = new ResidentDto();
  name;
  writeActualPass: string;
  responseText: string;
  showLoading: boolean;
  passwordNew: string;
  passwordConfirm: string;
  actualPass: string;
  fields: boolean;
  button;
  user: string;

  constructor() { }

  ngOnInit() {
    let user_ = JSON.parse(sessionStorage.getItem('userInfo'));
    this.name = user_.name;
    this.actualPass = user_.password;
    this.user = user_.user;
    this.button = document.getElementById('btn-start');
  }

  validateButton(){
    this.fields = false;
    this.button.className = 'btn-login-block';
    if(this.validateInfo()){
      this.fields = true;
      this.button.className = 'btn-login';
    }
    return this.fields;
  }

  validateInfo() {
    return (this.validateActualPassword() && this.name && this.user &&
      this.validateEmptyActualPassword() && this.actualPass && !this.validateNewPassWithOldPass()
      && this.passwordNew && this.passwordConfirm
      && (this.validatePasswords()));
  }

  validatePasswords() {
    return (this.passwordNew === this.passwordConfirm);
  }

  validateNewPassWithOldPass(){
    return (this.passwordNew == this.writeActualPass);
  }

  validateActualPassword(){
    return ((this.writeActualPass === this.actualPass));
  }

  validateEmptyNewPassword() {
    return (this.passwordNew);
  }

  validateEmptyActualPassword(){
    return (this.writeActualPass);
  }
  updateInfo(){
    this.residentDto.password = this.passwordNew;
    this.residentDto.name = this.name;
    this.residentDto.user = this.user;
    // envia request
  }

}
