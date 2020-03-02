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
  showList: boolean;
  openModal: boolean;
  titleModal = 'Enviar notificación';
  placeholder = 'Ingresa tu mensaje aqui, no puedes exceder el limite de 238 caracteres';

  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    console.log('lista: ',this.residentList);
    this.getAllResidents();
  }
  getAllResidents(){
    this.requestService.getAllResidents().then(response =>{
        console.log('residentes: ', response);
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

    for(let i=0; i<dataLenght; i++){
      var residente = new ResidentDto();
      residente.towerNumberHome=dataExcel[i].torre + '-' + dataExcel[i].apartamento;
      residente.name = dataExcel[i].nombre;
      residente.cellphone = '+57'+dataExcel[i].celular+'';
      residente.documentNumber = dataExcel[i].documento+'';
      console.log('lista: ',this.residentList);
      this.residentList.push(residente);
    }
    console.log('lista final: ',this.residentList);

    this.saveResideents();
  }
  saveResideents(){
    this.requestService.saveResidents(this.residentList).then(response =>{
      console.log('SE GUARDARON LOS RESIDENTES: ', response);
    }, error =>{

    });
  }

  notifyResident(resident) {
    this.openModal=true;
    const messageDto: MessageDto = new MessageDto();
    // recibir del evento del modal
    messageDto.message = 'Hola ';
    messageDto.phoneNumber = resident.cellphone;
    this.requestService.notifyResident(messageDto).then(response =>{
      console.log('notificacion enviada: ', response);
    });
  }

  notifyAllResidents(){
    const message = '';
    this.requestService.notifyAllResidents(message).then(response =>{
     console.log('notificacion enviada: ', response);
   });
  }

  closeModal(event){
    this.openModal=event;
  }
}
