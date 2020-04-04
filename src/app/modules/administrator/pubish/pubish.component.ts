import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { New } from 'src/app/core/models/New.model';
import {RepositoryService} from '../../../core/services/repository.service';

@Component({
  selector: 'app-pubish',
  templateUrl: './pubish.component.html',
  styleUrls: ['./pubish.component.css']
})
export class PubishComponent implements OnInit {

  news: New[] =  [];
  openModal = false;
  titleModal = 'Publicar noticia';
  placeholder = 'Escribe aquí una publicación';
  modalTextButton = 'Publicar';
  loadingSend;
  messageInModal;

  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.getNews();
  }

  getNews(){
    this.requestService.getNews().then(response =>{
      this.news = response.reverse();
      console.log('news: ', this.news);
    },error =>{

    });
  }

  validateNews(){
    return this.news.length>0;
  }
  addPublish(){
    this.openModal=true;
  }
  closeModal(event){
    this.openModal=event;
  }
  getText(text) {
    console.log(text);
    let new_ : New = new New();
    new_.information = text;
    this.requestService.publish(new_).then(response =>{
      this.news.unshift(response);
      this.setTextSuccessfulInModal();
    }, error =>{
      this.setTextFailInModal();
    });
  }

  setTextSuccessfulInModal(){
    this.loadingSend=false;
    this.messageInModal = 'Noticia publicada exitosamente!';
    this.resetMessage();
  }
  resetMessage() {
    setTimeout(() => {
      this.messageInModal='';
      this.loadingSend = false;
    }, 3000);
  }
  setTextFailInModal(){
    this.loadingSend=false;
    this.messageInModal = 'Ocurrio un error al publicar noticia';
    this.resetMessage();
  }
}
