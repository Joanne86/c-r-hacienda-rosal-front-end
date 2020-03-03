import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { New } from 'src/app/core/models/New.model';

@Component({
  selector: 'app-pubish',
  templateUrl: './pubish.component.html',
  styleUrls: ['./pubish.component.css']
})
export class PubishComponent implements OnInit {

  new_: New = new New();
  news: New[] =  new Array();
  openModal = false;
  titleModal = 'Publicar noticia';
  placeholder = 'Escribe aquí una publicación';
  modalTextButton = 'Publicar';

  constructor() { }

  ngOnInit() {

    this.mock();
  }
  mock(){
    let new1 : New = new New();
    new1.information='El dia de mañana habrá una junta directiva justo a los representantes del comite';
    new1.date = new Date();

    let new2 : New = new New();
    new2.information='El dia de mañana habrá una junta directiva justo a los representantes del comite';
    new2.date = new Date();

    let new3 : New = new New();
    new3.information='El dia de mañana habrá una junta directiva justo a los representantes del comite';
    new3.date = new Date();

    let new4 : New = new New();
    new4.information='El dia de mañana habrá una junta directiva justo a los representantes del comite';
    new4.date = new Date();

    this.news.push(new1, new2, new3, new4);
  }
  addPublish(){
    this.openModal=true;
  }
  closeModal(event){
    this.openModal=event;
  }
  getText(text) {
    console.log(text);
  }
}
