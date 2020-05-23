import { Component, OnInit } from '@angular/core';
import {RepositoryService} from '../../../core/services/repository.service';
import {RequestDto} from '../../../core/models/RequestDto.model';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-resident-news',
  templateUrl: './resident-news.component.html',
  styleUrls: ['./resident-news.component.css']
})
export class ResidentNewsComponent implements OnInit {

  requestResidents = new Array<RequestDto>();
  requestResidentsAux = new Array<RequestDto>();
  atendidas: number;
  sinAtender: number;
  placeholder = 'Escribe tu respuesta a esta solicitud';
  openModal: boolean;
  modalTextButton= 'Responder';
  titleModal: string;
  messageInModal: string;
  loadingSend: boolean;
  textArea: boolean;
  parrafo: string;
  requestToUpdateResponse: RequestDto;
  typeRequest = null;
  stateRequest = null;
  allTypeRequest;
  allStateRequest;
  listLength;

  typeRequestEnum = {
    1: 'Queja',
    2: 'Sugerencia',
    3: 'Petición'
  };
   stateRequestEnum = {
    1: 'Sin respuesta',
    2: 'Atendido'
  };
  constructor(private requestService : RepositoryService) { }

  ngOnInit() {
    this.getAllRequest();
  }
  getAllRequest(){
    this.requestService.getAllRequest().then(response =>{
      console.log('lista ordenada: ', response);
      console.log('lista al reves: ', response.reverse());
      this.listLength = response.length;
      this.requestResidents = response.reverse();
      this.requestResidentsAux = response.reverse();
      this.calculateRequest();
    }, error =>{

    });
  }

  calculateRequest(){
    this.atendidas = this.requestResidentsAux.filter(r => r.state == 'Atendido').length;
    this.sinAtender = this.requestResidentsAux.filter(r => r.state == 'Sin respuesta').length;
  }

  public filterRequestType(typeRequest){
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

  public filterRequestState(stateRequest){
    this.stateRequest=stateRequest;
    if(stateRequest === '3'){
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
          (r.state == this.stateRequestEnum[stateRequest]&&r.type == this.typeRequest));
      }else{
        this.requestResidents = this.requestResidentsAux.filter(r => r.state == this.stateRequestEnum[stateRequest]);
      }
    }
  }

  openAction(action, request: RequestDto){
    if(action === 2){
      this.textArea=false;
      this.titleModal = 'Respuesta que realizó a esta solicitud:';
      this.parrafo = request.response;

    }else{
      this.textArea = true;
      this.titleModal = 'Solicitud: ';
      this.parrafo = request.message;
      this.requestToUpdateResponse = request;
    }
    this.openModal = true;
    console.log('Action: ', action);
  }

  getText(text){
    this.requestToUpdateResponse.response = text;
    this.requestToUpdateResponse.state = 'Atendido';
    this.requestService.updateResponse(this.requestToUpdateResponse).then(response =>{
      this.setTextSuccessfulInModal();
      this.calculateRequest();
      setTimeout(() => {
        this.openModal = false;
      }, 4000);
    }, error =>{
      this.setTextFailInModal();
    });

  }

  setTextSuccessfulInModal(){
    this.loadingSend=false;
    this.messageInModal = 'Respuesta enviada exitosamente!';
    this.resetMessage();
  }
  resetMessage() {
    setTimeout(() => {
      this.messageInModal='';
      this.loadingSend = false;
    }, 3000);
  }
  closeModal(event){
    this.openModal=event;
  }
  setTextFailInModal(){
    this.loadingSend=false;
    this.messageInModal = 'Ocurrio un error al enviar la respuesta';
    this.resetMessage();
  }
}
