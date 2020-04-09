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
  residentListTemp = new Array<ResidentDto>();
  residentListSearch = new Array<ResidentDto>();
  residentDebtorsList = new Array<ResidentDto>();
  residentListSearchShow = new Array<ResidentDto>();
  showList: boolean;
  openModal: boolean;
  openModalAddResident: boolean;
  showLoadingUpdate = -1;
  loadingSend: boolean;
  messageInModal: string;

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
   console.log( window.innerHeight);
    this.requestService.getAllResidents().then(response => {
      this.residentListTemp = JSON.parse(JSON.stringify(response)); // sera el filtro
      this.residentListSearch = JSON.parse(JSON.stringify(response)); // lista original
      this.residentListSearchShow = JSON.parse(JSON.stringify(response));
      this.residentList = JSON.parse(JSON.stringify(response)); // lista que se muestra y se modifica
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
      resident.cellphone = dataExcel[i].celular;
      resident.documentNumber = dataExcel[i].documento + '';
      resident.months = dataExcel[i].meses_deuda;
      resident.debt = dataExcel[i].total_deuda;
      this.residentList.push(resident);

      if(resident.debt>0 && resident.months>0){
        this.residentDebtorsList.push(resident);
      }
    }
    this.resetLists();
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
    this.cellphoneToSendMessage = "+57"+resident.cellphone;
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
        this.setTextSuccessfulInModal();
      }, error =>{
        this.setTextFailInModal();
      });
    } else {
      const messageDto: MessageDto = new MessageDto();
      messageDto.message = text;
      messageDto.phoneNumber = this.cellphoneToSendMessage;
      this.requestService.notifyResident(messageDto).then(response => {
        console.log('notificacion enviada: ', response);
        this.setTextSuccessfulInModal();
      }, error =>{
        this.setTextFailInModal();
      });
    }
  }

  setTextSuccessfulInModal(){
    this.loadingSend=false;
    this.messageInModal = 'Mensaje enviando exitosamente!';
    this.resetMessage();
  }
  resetMessage() {
    setTimeout(() => {
      this.messageInModal='';
      this.loadingSend = false;
    }, 3000);
  }
  setTextFailInModal(){
    this.loadingSend=false;
    this.messageInModal = 'Ocurrio un error al enviar el mensaje';
    this.resetMessage();
  }

  addResident(){
    this.openModalAddResident = true;
  }

  searchTowelHome(towelHome){
    if(towelHome){
      this.residentList = this.residentList.filter(r => r.towerNumberHome.includes(towelHome));
      this.residentListTemp = this.residentListTemp.filter(r => r.towerNumberHome.includes(towelHome));
    }else{
      this.residentList = this.residentListSearchShow;
      this.residentListTemp = this.residentListSearch;
    }
  }


  validateFields(i) {
    return ((this.residentList[i].cellphone !== this.residentListTemp[i].cellphone) ||
      (this.residentList[i].months !== this.residentListTemp[i].months)||
      (this.residentList[i].debt !== this.residentListTemp[i].debt));
  }

  saveInfo(i){
    this.showLoadingUpdate=i;
    console.log('resident to update: ', this.residentList[i]);
    if(this.residentList[i].cellphone !== this.residentListTemp[i].cellphone){
      this.requestService.deleteNumber(this.residentListTemp[i].cellphone).then(responseDel =>{

       this.requestService.addNumber(this.residentList[i].cellphone).then(responseAdd =>{
         this.showLoadingUpdate=-1;

          if(this.residentList[i].debt>0 && this.residentList[i].months>0){
            this.showLoadingUpdate=i;
            this.requestService.addDebtorNumber(this.residentList[i].cellphone).then(responseAddDebtor =>{
              this.showLoadingUpdate=-1;
              this.updateResidentInBD(i);
            }, error =>{
              this.showLoadingUpdate=-1;
            });
          }else{
            this.updateResidentInBD(i);
          }

        }, error =>{
         this.showLoadingUpdate=-1;
        });
      }, error =>{
        this.showLoadingUpdate=-1;
      });
    }else{
      this.updateResidentInBD(i);
    }
  }

  updateResidentInBD(i){
    this.requestService.updateResident(this.residentList[i]).then(response=>{
      this.residentListTemp[i].cellphone = this.residentList[i].cellphone;
      this.residentListTemp[i].months = this.residentList[i].months;
      this.residentListTemp[i].debt = this.residentList[i].debt;
      this.showLoadingUpdate=-1;
    }, error =>{
      this.showLoadingUpdate=-1;
    });
  }

  validateShowLoadingUpdate(i){
    return(this.showLoadingUpdate===i);
  }

  pushResidentSavedInList(residentSaved){
    this.residentList.push(residentSaved);
    this.residentListTemp.push(residentSaved);
    this.residentListSearchShow.push(residentSaved);
    this.residentListSearch.push(residentSaved);
    this.resetLists();
  }

  resetLists(){
    this.residentListSearch = JSON.parse(JSON.stringify(this.residentList));
    this.residentListSearchShow = JSON.parse(JSON.stringify(this.residentList));
    this.residentListTemp = JSON.parse(JSON.stringify(this.residentList));
  }
}
