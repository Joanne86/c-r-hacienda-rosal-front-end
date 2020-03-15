import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/core/services/repository.service';
import { ResidentDto } from 'src/app/core/models/ResidentDto.model';
import {MessageDto} from '../../../core/models/MessageDto.model';

@Component({
  selector: 'app-notify-residents',
  templateUrl: './notify-residents.component.html',
  styleUrls: ['./notify-residents.component.css']
})
export class NotifyResidentsComponent implements OnInit {

  uploadFile: boolean;
  residentList = new Array<ResidentDto>();
  residentDebtorsList = new Array<ResidentDto>();
  showList: boolean;
  openModal: boolean;
  openModalAddResident: boolean;

  titleModal = 'Enviar notificación';
  placeholder = 'Ingresa tu mensaje aqui, no puedes exceder el limite de 238 caracteres';
  modalTextButton = 'Enviar';

  cellphoneToSendMessage;
  sendAllResidents: boolean;

  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.getAllResidents();
  }
  getAllResidents() {
    this.requestService.getAllResidents().then(response => {
        this.residentList = response;
       this.uploadFile = (response === null);
       this.showList = (response !== null);
    }, error =>{
        console.log('entra al error');
    });
  }
  public getDataExcel(dataExcel){
    console.log('llego la data del excel: ', dataExcel);
    const dataLenght = Object.keys(dataExcel).length;
    this.residentList = Array<ResidentDto>();
    this.showList =(dataLenght >=1);

    for ( let i = 0; i < dataLenght ; i++) {
      const resident = new ResidentDto();
      resident.towerNumberHome = dataExcel[i].torre + '-' + dataExcel[i].apartamento;
      resident.name = dataExcel[i].nombre;
      resident.cellphone = '+57' + dataExcel[i].celular + '';
      resident.documentNumber = dataExcel[i].documento + '';
      resident.months = dataExcel[i].meses_deuda;
      resident.debt = dataExcel[i].total_deuda;
      console.log('lista: ', this.residentList);
      this.residentList.push(resident);
      if(resident.debt>0 && resident.months>0){
        console.log('valida deudor');
        this.residentDebtorsList.push(resident);
      }
    }

    this.saveResidents();
  }
  saveResidents() {
    this.requestService.saveResidents(this.residentList).then(response =>{
      console.log('SE GUARDARON LOS RESIDENTES: ', response);
    }, error => {

    });
console.log('this.residentDebtorsList.length: ', this.residentDebtorsList.length);
    if(this.residentDebtorsList.length>0){
      this.requestService.saveDebtorNumbers(this.residentDebtorsList).then(response =>{
        console.log('SE GUARDARON LOS NUMEROS DE LOS DEUDORES : ', response);
      }, error => {
  
      });
    }
  }

  notifyResident(resident) {
    this.openModal = true;
    this.cellphoneToSendMessage = resident.cellphone;
    this.sendAllResidents = false;
  }

  notifyAllResidents() {
    this.openModal = true;
    this.sendAllResidents = true;
  }

  closeModal(event) {
    this.openModal = event;
  }

  closeModalAddResident(event){
    this.openModalAddResident = event;
  }

  getText(text) {
    if (this.sendAllResidents) {
      this.requestService.notifyAllResidents(text).then(response =>{
        console.log('notificacion enviada: ', response);
      });
    } else {
      const messageDto: MessageDto = new MessageDto();
      messageDto.message = text;
      messageDto.phoneNumber = this.cellphoneToSendMessage;
      this.requestService.notifyResident(messageDto).then(response => {
        console.log('notificacion enviada: ', response);
      });
    }
  }

  addResident(){
    this.openModalAddResident = true;
  }



  saveInfo(resident: ResidentDto){
    
  }
}
