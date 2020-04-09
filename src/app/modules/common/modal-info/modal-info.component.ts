import {Component, Input, OnInit} from '@angular/core';
import {New} from '../../../core/models/New.model';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent implements OnInit {

  title = '';
  textButton: string;
  constructor() { }

  ngOnInit() {

  }
  accept(){

  }
  spanClick(){

  }

}
