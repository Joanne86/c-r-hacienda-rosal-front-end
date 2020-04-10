import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResidentDto } from 'src/app/core/models/ResidentDto.model';
import { RepositoryService } from 'src/app/core/services/repository.service';
import {MessageDto} from '../../../core/models/MessageDto.model';

@Component({
  selector: 'app-add-resident',
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.css']
})
export class AddResidentComponent implements OnInit {

  @Output() closeModalAddResident = new EventEmitter<any>();
  @Output() residentSaved = new EventEmitter<any>();
  residentDto: ResidentDto = new ResidentDto();
  button;
  modal: HTMLElement;
  fields;
  loading;
  textButton = 'Guardar';
  messageGood = 'El residente se acaba de guardar con exito!';
  messageFail = 'Ocurrio un error al guardar el residente';
  goodSave;
  showMessage;
  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.modal = document.getElementById("myModal");
    this.button = document.getElementById('btn-save');
  }

  validateButton(){
    this.fields = false;
    this.button.className = 'btn-login-block';

    const patternTowel = /[0-9]{1,2}-[0-9][0-9][0-9]/g;
    let towelPass = patternTowel.test(String(this.residentDto.towerNumberHome));

    const patternDocument = /^[0-9]+$/g;
    let documentPass = patternDocument.test(String(this.residentDto.documentNumber));

    const patternCellphone = '^[3].{2}[1-9]\\d{6}$';
    let validCellphone = false;

    if (this.residentDto.cellphone) {
      validCellphone = !!this.residentDto.cellphone.match(patternCellphone);
    }

    if(validCellphone && this.residentDto.debt>=0
      && documentPass && this.residentDto.months>=0
      && this.residentDto.name && towelPass){
      this.fields = true;
      this.button.className = 'btn-send';
    }
    return this.fields;
  }

  saveResident(residentDto: ResidentDto){
    this.setValuesBeforeSave();
    let request = JSON.parse(JSON.stringify(residentDto));
    this.requestService.saveResident(request).then(response =>{
      this.residentSaved.emit(request);
      this.goodSave=true;
      this.alertResident(residentDto);
    }, error =>{
      this.setValuesWhenSave(error);
      this.goodSave=false;
    });
  }
  alertResident(residentDto: ResidentDto){
    console.log('requestDto: ', residentDto);
    let messageDto: MessageDto = new MessageDto();
    messageDto.message = 'usted con cedula '+ residentDto.documentNumber+' se ecuentra registrado en la aplicacion del conjunto residencial, ' +
      'ingrese a este link para acceder a la apliacion web -> conjunto-hacienda-rosal.com/#/login ingresando su cedula en ambos campos';
    messageDto.phoneNumber = '+57'+residentDto.cellphone;
    this.requestService.notifyResident(messageDto).then(response => {
      this.setValuesWhenSave();
    }, error =>{
      this.setValuesWhenSave();
    });
  }
  setValuesBeforeSave(){
    this.messageGood = 'El residente se acaba de guardar con exito!';
    this.messageFail = 'Ocurrio un error al guardar el residente';
    this.textButton = 'Guardando';
    this.loading = true;
  }

  setValuesWhenSave(error?){
    this.loading=false;
    this.textButton = 'Guardar';
    this.showMessage=true;
    if(!error){
      this.residentDto.cellphone = '';
      this.residentDto.debt = undefined;
      this.residentDto.documentNumber = '';
      this.residentDto.months = undefined;
      this.residentDto.name = '';
      this.residentDto.towerNumberHome = '';
    }
    setTimeout(() => {
      this.messageGood = '';
      this.messageFail = '';
    }, 6000);
  }


  spanClick() {
    this.closeModalEvent();
  }

  closeModalEvent(){
    this.modal.style.display = "none";
    this.closeModalAddResident.emit(false);
  }

}
