import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {New} from '../../../core/models/New.model';
import {Commentary} from '../../../core/models/Commentary.model';

@Component({
  selector: 'app-modal-commentaries',
  templateUrl: './modal-commentaries.component.html',
  styleUrls: ['./modal-commentaries.component.css']
})
export class ModalCommentariesComponent implements OnInit {
  @Output() closeModal = new EventEmitter<any>();
  @Input() commentaries : Commentary[] = [];
  modal: HTMLElement;
  constructor() { }

  ngOnInit() {
    this.modal = document.getElementById("myModal");
  }

  spanClick() {
    this.closeModalEvent();
  }

  closeModalEvent(){
    this.modal.style.display = "none";
    this.closeModal.emit(false);
  }

  validateCommentaries(){
    return (this.commentaries)?this.commentaries.length===0:this.commentaries;
  }

}
