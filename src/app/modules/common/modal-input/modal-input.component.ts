import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.css']
})
export class ModalInputComponent implements OnInit {

  @Input('title') title;
  @Input('placeholder') placeholder;
  @Output() closeModal = new EventEmitter<any>();
  modal: HTMLElement;
  button;
  request;
  fields;
  constructor() { }

  ngOnInit() {
    this.modal = document.getElementById("myModal");
    this.button = document.getElementById('btn-start');
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
  }

  validateField(){
    this.fields = false;
    this.button.className = 'btn-login-block';
    if(this.request){
      this.fields = true;
      this.button.className = 'btn-send';
    }
    return this.fields;
  }
}
