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
        alert('Ocurrio un error al traer la información de los residentes');
    });
  }
  public getDataExcel(dataExcel){
    console.log('llego la data del excel: ', dataExcel);
    if(this.validateExcelFields(dataExcel)){

      const dataLenght = Object.keys(dataExcel).length;
      this.residentList = Array<ResidentDto>();
      this.showList =(dataLenght >=1);
      if(dataLenght>=1){
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
      }else{
        alert('El archivo que acaba de adjuntar no tiene datos, por favor valide la información e intente nuevamente');
      }
    }else{
      alert('Algunos datos del archivo que acaba de adjuntar no son validos, por favor valide la información e intente nuevamente');
    }
  }
  validateExcelFields(dataExcel){
    let invalidFields = 0;
    let validateAllFields = true;
    const dataLenght = Object.keys(dataExcel).length;
    for ( let i = 0; i < dataLenght ; i++){
      if(!this.validateTorre(dataExcel[i].torre)
        || !this.validateApartemento(dataExcel[i].apartamento)
        || !this.validateName(dataExcel[i].nombre)
        || !this.validateCellphone(dataExcel[i].celular)
        || !this.validateJustNumbers(dataExcel[i].documento)
        || !this.validateJustNumbers(dataExcel[i].meses_deuda)
        || !this.validateJustNumbers(dataExcel[i].total_deuda)){
        console.log('algun dato invalido');
        invalidFields ++;
      }
    }
    if(invalidFields>0){
      validateAllFields = false;
    }
    return validateAllFields;
  }

  validateTorre(torre){
    const patron = /^\D*\d{2}$/;
    return patron.test(torre);
  }

  validateApartemento(apartamento){
    const patron = /^\D*\d{3}$/;
    return patron.test(apartamento);
  }

  validateName(name){
    const patternName = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/;
    return patternName.test(String(name));
  }

  validateCellphone(cellphone){
    const patternCellphone = '^[3].{2}[1-9]\\d{6}$';
    let validCellphone = false;

    let cell = String(cellphone);
    if (cell) {
      validCellphone = !!cell.match(patternCellphone);
    }
    return validCellphone;
  }

  validateJustNumbers(number){
    const patternNumber = /^[0-9]+$/g;
    return patternNumber.test(String(number));
  }

  saveResidents() {

    this.requestService.saveResidents(this.residentList).then(response =>{
      alert('SE GUARDARON LOS RESIDENTES CON EXITO!');
    }, error => {
      alert('Ocurrio un error al guardar los datos de los residentes, intentelo más tarde.');
    });

    if(this.residentDebtorsList.length>0){
      this.requestService.saveDebtorNumbers(this.residentDebtorsList).then(response =>{
        console.log('SE GUARDARON LOS NUMEROS DE LOS DEUDORES : ', response);
      }, error => {
        alert('Ocurrio un error al guardar los datos de los deudores, intentelo más tarde.');
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
    return (((this.residentList[i].cellphone !== this.residentListTemp[i].cellphone) ||
      (this.residentList[i].months !== this.residentListTemp[i].months)||
      (this.residentList[i].debt !== this.residentListTemp[i].debt))
      && this.validateEmptyFields(i));
  }

  validateEmptyFields(i){
    return ((this.residentList[i].cellphone !== '')&&
      (this.residentList[i].months !== null && this.residentList[i].months!== undefined)&&
      (this.residentList[i].debt !== null && this.residentList[i].debt !== undefined));
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
              this.alertToUpdate();
            });
          }else{
            this.updateResidentInBD(i);
          }
        }, error =>{
         this.showLoadingUpdate=-1;
         this.alertToUpdate();
        });
      }, error =>{
        this.showLoadingUpdate=-1;
        this.alertToUpdate();
      });
    }else{
      this.updateResidentInBD(i);
    }
  }

  alertToUpdate(){
    alert('Ocurrio un error al actualizar la información del residente, intentelo de nuevo más tarde');
  }

  updateResidentInBD(i){
    this.requestService.updateResident(this.residentList[i]).then(response=>{
      this.residentListTemp[i].cellphone = this.residentList[i].cellphone;
      this.residentListTemp[i].months = this.residentList[i].months;
      this.residentListTemp[i].debt = this.residentList[i].debt;
      this.showLoadingUpdate=-1;
    }, error =>{
      this.showLoadingUpdate=-1;
      this.alertToUpdate();
    });
  }

  validateShowLoadingUpdate(i){
    return(this.showLoadingUpdate===i);
  }

  pushResidentSavedInList(residentSaved){
    this.residentList.push(residentSaved);
    this.resetLists();
  }

  resetLists(){
    this.residentListSearch = JSON.parse(JSON.stringify(this.residentList));
    this.residentListSearchShow = JSON.parse(JSON.stringify(this.residentList));
    this.residentListTemp = JSON.parse(JSON.stringify(this.residentList));
  }
}
