import { Component, OnInit } from '@angular/core';
import {RepositoryService} from '../../../core/services/repository.service';
import {RequestDto} from '../../../core/models/RequestDto.model';
import {ResidentDto} from '../../../core/models/ResidentDto.model';

@Component({
  selector: 'app-send-requests',
  templateUrl: './send-requests.component.html',
  styleUrls: ['./send-requests.component.css']
})



export class SendRequestsComponent implements OnInit {
  fields;
  button;
  message;
  optionSelected: boolean;
  showLoading: boolean;
  typeRequest: number;
  responseText: string;

  typeRequestEnum = {
    1: 'queja',
    2: 'sugerencia',
    3: 'petición'
  };

  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.button = document.getElementById('btn-start');
  }

  validateField(){
    this.fields = false;
    this.button.className = 'btn-login-block';
    if(this.message && this.optionSelected){
      this.fields = true;
      this.button.className = 'btn-login';
    }
    return this.fields;
  }

  select(typeRequest){
    this.typeRequest =typeRequest;
    this.optionSelected = true;
    console.log('valida button');
  }

  start(){
    this.showLoading = true;
    let request : RequestDto = new RequestDto();
    request.message = this.message;
    request.type=this.typeRequest;
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    request.userDto = new ResidentDto();
    request.userDto.debt = userInfo.debt;
    request.userDto.documentNumber = userInfo.documentNumber;
    request.userDto.name = userInfo.name;
    request.userDto.cellphone = userInfo.cellphone;
    request.userDto.towerNumberHome = userInfo.towerNumberHome;
    request.userDto.userType = userInfo.userType;
    request.userDto.months = userInfo.months;


    console.info('request: ', request);
    this.requestService.sendRequest(request).then(response =>{
      this.resentLoading();
      this.responseText = 'Tu '.concat(this.typeRequestEnum[this.typeRequest]).concat(' ha sido enviada con exito!');
    }, error =>{
      this.resentLoading();
      this.responseText = 'Ha ocurrido un error al enviar tu '.concat(this.typeRequestEnum[this.typeRequest]);
    });
  }

  resentLoading(){
    this.message='';
    this.showLoading = false;
  }

}
