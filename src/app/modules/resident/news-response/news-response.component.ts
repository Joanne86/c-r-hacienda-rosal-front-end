import { Component, OnInit } from '@angular/core';
import {RequestDto} from '../../../core/models/RequestDto.model';
import {RepositoryService} from '../../../core/services/repository.service';

@Component({
  selector: 'app-news-response',
  templateUrl: './news-response.component.html',
  styleUrls: ['./news-response.component.css']
})
export class NewsResponseComponent implements OnInit {

  requestResidents = new Array<RequestDto>();
  requestResidentsAux = new Array<RequestDto>();
  openModal: boolean;
  titleModal = 'Respuesta de tu solicitud: ';
  textArea = false;
  parrafo: string;
  atendidas;
  sinAtender;
  listLength;
  allTypeRequest;
  allStateRequest;
  typeRequest = null;
  stateRequest = null;

  typeRequestEnum = {
    1: 'Queja',
    2: 'Sugerencia',
    3: 'Petición'
  };
  stateRequestEnum = {
    1: 'Sin respuesta',
    2: 'Atendido'
  };
  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.getResponses();
  }

  getResponses(){
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    this.requestService.getResponses(userInfo.towerNumberHome).then(response =>{
      this.requestResidents = response.reverse();
      this.requestResidentsAux = response.reverse();
      this.listLength = response.length;
      this.calculateRequest();
    }, error=>{
      alert('Ocurrio un error al traer las solicitudes realizadas, intentelo de nuevo mas tarde');
    });
  }

  calculateRequest(){
    this.atendidas = this.requestResidents.filter(r => r.state == 'Atendido').length;
    this.sinAtender = this.requestResidents.filter(r => r.state == 'Sin respuesta').length;
  }
  closeModal(event){
    this.openModal=event;
  }
  showResponse(request: RequestDto){
    this.openModal=true;
    this.parrafo = request.response;
  }
  filterRequestType(typeRequest){
    this.typeRequest = typeRequest;
    if(typeRequest === '4'){

      this.allTypeRequest = true;

      if(this.allTypeRequest && this.allStateRequest){
        this.requestResidents = this.requestResidentsAux;
      }else if(this.stateRequest){
        this.requestResidents = this.requestResidentsAux.filter(r => r.state == this.stateRequestEnum[this.stateRequest]);
      }else {
        this.requestResidents = this.requestResidentsAux;
      }
    }else{
      this.allTypeRequest = false;

      if(this.stateRequest && this.stateRequest!=='3'){
        this.requestResidents = this.requestResidentsAux.filter(r =>
          (r.type == typeRequest && r.state == this.stateRequestEnum[this.stateRequest]));
      }else{
        this.requestResidents = this.requestResidentsAux.filter(r => r.type == typeRequest);
      }
    }
  }
  filterRequestState(requestState){
    this.stateRequest=requestState;
    if(requestState === '3'){
      this.allStateRequest = true;
      if(this.allTypeRequest && this.allStateRequest){
        this.requestResidents = this.requestResidentsAux;
      }else if(this.typeRequest){
        this.requestResidents = this.requestResidentsAux.filter(r => r.type == this.typeRequest);
      }else{
        this.requestResidents = this.requestResidentsAux;
      }
    }else{
      this.allStateRequest = false;
      if(this.typeRequest && this.typeRequest!== '4'){
        this.requestResidents = this.requestResidentsAux.filter(r =>
          (r.state == this.stateRequestEnum[requestState]&&r.type == this.typeRequest));
      }else{
        this.requestResidents = this.requestResidentsAux.filter(r => r.state == this.stateRequestEnum[requestState]);
      }
    }
  }
}
