import { Component, OnInit } from '@angular/core';
import {ResidentDto} from '../../../core/models/ResidentDto.model';
import {RepositoryService} from '../../../core/services/repository.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  residentDto: ResidentDto = new ResidentDto();
  residentDtoAux: ResidentDto = new ResidentDto();
  nameAux;
  name;
  writeActualPass: string;
  responseText: string;
  showLoading: boolean;
  passwordNew: string;
  passwordConfirm: string;
  actualPass: string;
  fields: boolean;
  button;
  documentAux: string;
  documentNumber: string;
  user: string;
  userAux;
  showUserExist: boolean;
  showDocumentExist: boolean;

  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.button = document.getElementById('btn-start');
    this.setDataSession();
    this.showDocumentExist = false;
  }

  setDataSession(){
    let user_ = JSON.parse(sessionStorage.getItem('userInfo'));

    this.name = user_.name;
    this.nameAux =  user_.name;

    this.actualPass = user_.password;
    this.documentNumber = user_.documentNumber;
    this.user = user_.user;

    this.userAux=user_.user;
    this.documentAux=user_.documentNumber;

    this.residentDto.userType = user_.userType;
    this.residentDto.idSession = user_.idSession;

    this.residentDtoAux.months=user_.months;
    this.residentDtoAux.debt=user_.debt;
    this.residentDtoAux.towerNumberHome=user_.towerNumberHome;
    this.residentDtoAux.cellphone=user_.cellphone;

    this.passwordNew = '';
    this.passwordConfirm= '';
  }

  validateButton(){
    this.fields = false;
    this.button.className = 'btn-login-block';
    if(this.validateInfo() && !this.passwordNew && !this.passwordConfirm){
      this.fields = true;
      this.button.className = 'btn-login';
    }else if(this.passwordNew || this.passwordConfirm){
      this.activateButtonAllInfo();
    }
    return this.fields;
  }

  activateButtonAllInfo(){
    if(!this.validateDiff()){
      this.activeButtonJustPass();
    }else if(this.validateAllInfo()){
      this.fields = true;
      this.button.className = 'btn-login';
    }
  }

  activeButtonJustPass(){
    if(this.validateJustPassword()){
      this.fields = true;
      this.button.className = 'btn-login';
    }
  }

  validateJustNumbers(number){
    const patternNumber = /^[0-9]+$/g;
    return patternNumber.test(String(number));
  }

  validateInfo() {
    return (this.validateActualPassword() && this.validateDiff() && this.user && this.name && this.documentNumber
      && this.validateJustNumbers(this.documentNumber)
       && this.validateEmptyActualPassword() && this.actualPass);
  }

  validateDiff(){
    return (this.validateUserDiff() || this.validateNameDiff() || this.validateDocumentDiff());
  }

  validateDocumentDiff(){
    return (this.documentNumber !== this.documentAux);
  }

  validateUserDiff(){
    return (this.user !==this.userAux);
  }

  validateNameDiff(){
    return (this.name !== this.nameAux);
  }

  validateAllInfo() {
    return (this.validateActualPassword() && this.validateDiff() && this.user && this.name &&
      this.documentNumber
      && this.validateJustNumbers(this.documentNumber)
      && this.validateEmptyActualPassword() && this.actualPass && !this.validateNewPassWithOldPass()
      && this.passwordNew && this.passwordConfirm
      && (this.validatePasswords()));
  }

  validateJustPassword() {
    return (this.validateActualPassword() && this.user && this.name
      && this.validateEmptyActualPassword() && this.actualPass && !this.validateNewPassWithOldPass()
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
  updateInfo() {
    this.residentDto.password = this.passwordNew;
    this.residentDto.name = this.name;
    this.residentDto.user = this.user;
    this.residentDto.documentNumber = this.documentNumber;

    this.validateUserDiffToUpdate();
  }

  validateUserDiffToUpdate(){
    if(this.validateUserDiff()){
      this.requestService.validateUserName(this.residentDto.user).then(response => {
        this.showUserExist = response;
        if(this.showUserExist){
          this.noShowExistUser();
        }else{
          this.validateDocumentExist();
        }
      }, error => {
        this.errorToUpdate();
      });
    }else{
      this.validateDocumentExist();
    }
  }

  validateDocumentExist(){
    if(this.validateDocumentDiff()){
      this.requestService.validateDocument(this.residentDto.documentNumber).then(response => {
        this.showDocumentExist = response;
        if(this.showDocumentExist){
          this.noShowDocumentExist();
        }else{
          this.updateUser();
        }
      }, error => {
        this.errorToUpdate();
      });
    }else{
      this.updateUser();
    }
  }

  updateUser(){
    this.requestService.updateUser(this.residentDto).then(response => {
      this.showLoading = false;
      this.responseText = 'Sus datos acaban de ser actualizados';
      this.updateUserInfoKey();
      this.noShowResponseText();
    }, error => {
      this.errorToUpdate();
    });
  }

  validateJustLetters(name){
    const patternName = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/;
    return patternName.test(String(name));
  }

  updateUserInfoKey(){
    this.residentDto.documentNumber = this.documentNumber;
    this.residentDto.password = (this.passwordNew)?this.passwordNew:this.actualPass;

    this.residentDto.cellphone = this.residentDtoAux.cellphone;
    this.residentDto.debt = this.residentDtoAux.debt;
    this.residentDto.months = this.residentDtoAux.months;
    this.residentDto.towerNumberHome= this.residentDtoAux.towerNumberHome;

    sessionStorage.setItem('userInfo',  JSON.stringify(this.residentDto));
    this.setDataSession();
    this.writeActualPass='';
  }

  errorToUpdate(){
    this.showLoading = false;
    this.responseText = 'Ocurrio un error al actualizar su información';
    this.noShowResponseText();
  }

  noShowResponseText(){
    setTimeout(() => {
      this.responseText = '';
    }, 3000);
  }

  noShowDocumentExist(){
    setTimeout(() => {
      this.showDocumentExist = false;
    }, 3000);
  }
  noShowExistUser(){
    setTimeout(() => {
      this.showUserExist = false;
    }, 3000);
  }
}
