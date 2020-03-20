import { Component, OnInit } from '@angular/core';
import { ResidentDto } from 'src/app/core/models/ResidentDto.model';
import { RepositoryService } from 'src/app/core/services/repository.service';
import { MessageDto } from 'src/app/core/models/MessageDto.model';

@Component({
  selector: 'app-remember-debtors',
  templateUrl: './remember-debtors.component.html',
  styleUrls: ['./remember-debtors.component.css']
})
export class RememberDebtorsComponent implements OnInit {

  debtors = new Array<ResidentDto>();
  residentListTemp = new Array<ResidentDto>();
  openModal: boolean;
  titleModal = 'Enviar notificación';
  placeholder = 'Ingresa tu mensaje aqui, no puedes exceder el limite de 238 caracteres';
  modalTextButton = 'Enviar';
  cellphoneToSendMessage;
  sendAllResidents: boolean;
  showList: boolean;

  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.getAllDebtors();
  }

  getAllDebtors(){
    this.requestService.getAllDebtors().then(response =>{
      this.debtors = response;
      this.residentListTemp = this.debtors;
      this.showList = (response !== null);
    });
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

  getText(text) {
    if (this.sendAllResidents) {
      this.requestService.notifyAllDebtors(text).then(response =>{
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

  searchTowelHome(towelHome){
    if(towelHome){
      this.debtors = this.residentListTemp.filter(r => r.towerNumberHome.includes(towelHome));
    }else{
      this.debtors = this.residentListTemp;
    }
  }
}
