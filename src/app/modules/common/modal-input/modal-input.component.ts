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
  @Input('loadingSend') loadingSend: boolean;
  @Input('message') message: string;
  @Output() closeModal = new EventEmitter<any>();
  @Output() sendText = new EventEmitter<any>();
  modal: HTMLElement;
  button;
  text;
  fields;
  maxLength: number;
  textButtonAux: string;

  constructor() { }

  ngOnInit() {
    this.textButtonAux = this.textButton;
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
    this.textButton = 'Enviando...';
    this.button.className = 'btn-login-block';
    this.loadingSend = true;
    this.sendText.emit(this.text);
  }

  validateMessage(){
    this.loadingSend = false;
    if(this.message){
      this.textButton = this.textButtonAux;
      setTimeout(() => {
        this.text='';
        this.message = '';
        this.loadingSend = false;
      }, 3000);
    }
    return this.message;
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
