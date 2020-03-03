import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {EndErrorLine} from 'tslint/lib/verify/lines';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.css']
})
export class ModalInputComponent implements OnInit {

  @Input('title') title;
  @Input('placeholder') placeholder;
  @Input('notification') notification: boolean;
  @Input('textButton') textButton: string;
  @Output() closeModal = new EventEmitter<any>();
  @Output() sendText = new EventEmitter<any>();
  modal: HTMLElement;
  button;
  text;
  fields;
  maxLength: number;
  constructor() { }

  ngOnInit() {
    this.modal = document.getElementById("myModal");
    this.button = document.getElementById('btn-start');
    if(this.notification){
      this.maxLength = 238;
    }else{
      this.maxLength = 500;
    }
  }
  spanClick() {
    this.closeModalEvent();
  }

  closeModalEvent(){
    this.modal.style.display = "none";
    this.closeModal.emit(false);
  }

  sendPublish(){
    this.closeModalEvent();
    this.sendText.emit(this.text);
  }

  validateField(){
    this.fields = false;
    this.button.className = 'btn-login-block';
    if(this.text){
      this.fields = true;
      this.button.className = 'btn-send';
    }
    return this.fields;
  }
}
