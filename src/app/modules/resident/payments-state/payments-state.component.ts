import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments-state',
  templateUrl: './payments-state.component.html',
  styleUrls: ['./payments-state.component.css']
})
export class PaymentsStateComponent implements OnInit {

  months;
  amount;
  constructor() { }

  ngOnInit() {
    this.getDebtInfo();
  }

  getDebtInfo(){

  }

}
