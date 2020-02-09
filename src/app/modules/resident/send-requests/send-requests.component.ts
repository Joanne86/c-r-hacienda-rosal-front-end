import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-requests',
  templateUrl: './send-requests.component.html',
  styleUrls: ['./send-requests.component.css']
})
export class SendRequestsComponent implements OnInit {
  fields;
  button;
  request;

  constructor() { }

  ngOnInit() {
    this.button = document.getElementById('btn-start');
  }

  validateField(){
    this.fields = false;
    this.button.className = 'btn-login-block';
    if(this.request){
      this.fields = true;
      this.button.className = 'btn-login';
    }
    return this.fields;
  }

}
