import { Component, OnInit } from '@angular/core';
import {RepositoryService} from '../../../core/services/repository.service';
import {DebtInfo} from '../../../core/models/DebtInfo.model';

@Component({
  selector: 'app-payments-state',
  templateUrl: './payments-state.component.html',
  styleUrls: ['./payments-state.component.css']
})
export class PaymentsStateComponent implements OnInit {

  debtInfo: DebtInfo = new DebtInfo();
  userInfo;
  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.getResidentInfo();
    this.getDebtInfo();
  }
  getResidentInfo(){
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  }
  getDebtInfo(){
    this.requestService.getDebtInfo(this.userInfo.towerNumberHome).then(response =>{
      this.debtInfo = response;
    }, error =>{
      alert('Ocurrio un error al traer la información de pago, intentelo de nuevo mas tarde');
    });
  }

}
