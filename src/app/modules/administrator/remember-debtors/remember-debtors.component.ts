import { Component, OnInit } from '@angular/core';
import { ResidentDto } from 'src/app/core/models/ResidentDto.model';
import { RepositoryService } from 'src/app/core/services/repository.service';

@Component({
  selector: 'app-remember-debtors',
  templateUrl: './remember-debtors.component.html',
  styleUrls: ['./remember-debtors.component.css']
})
export class RememberDebtorsComponent implements OnInit {

  uploadFile: boolean;
  debtors = new Array<ResidentDto>();
  showList: boolean;
  openModal: boolean;
  titleModal = 'Enviar notificación';
  placeholder = 'Ingresa tu mensaje aqui, no puedes exceder el limite de 238 caracteres';
  modalTextButton = 'Enviar';
  cellphoneToSendMessage;
  sendAllResidents: boolean;

  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.getAllDebtors();
  }

  getAllDebtors(){
    this.requestService.getAllDebtors().then(response =>{
      this.debtors = response;
    });
  }

  getDataExcel(event){

  }
}
