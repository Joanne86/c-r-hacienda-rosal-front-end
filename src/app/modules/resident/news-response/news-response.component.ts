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
  openModal: boolean;
  titleModal = 'Respuesta de tu solicitud: ';
  textArea = false;
  parrafo: string;
  atendidas;
  sinAtender;

  typeRequestEnum = {
    1: 'Queja',
    2: 'Sugerencia',
    3: 'Petición'
  };
  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.getResponses();
  }

  getResponses(){
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    this.requestService.getResponses(userInfo.towerNumberHome).then(response =>{
      this.requestResidents = response.reverse();
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
}
