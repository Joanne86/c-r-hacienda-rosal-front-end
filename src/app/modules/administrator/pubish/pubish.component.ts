import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { New } from 'src/app/core/models/New.model';
import {RepositoryService} from '../../../core/services/repository.service';
import {Commentary} from '../../../core/models/Commentary.model';
import get = Reflect.get;

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
  openModalCommentaries: boolean;
  commentaries: Commentary[];

  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.getNews();
  }

  getNews(){
    this.requestService.getNews().then(response =>{
      this.news = response.reverse();
      let content = document.getElementById('content-super');
      if(this.news.length>0){
        content.className = 'content-super-height';
      }else{
        content.className ='content-super-height';
      }
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
  closeModalCommentaries(event){
    this.openModalCommentaries = event;
  }
  getText(text) {
    console.log(text);
    let new_ : New = new New();
    new_.information = text;
    this.requestService.publish(new_).then(response =>{
      response.commentaries = 0;
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

  showCommentaries(new_: New){
    this.openModalCommentaries = true;
    this.requestService.getCommentaries(new_.id).then(response =>{
      console.log('comentarios: ', response);
      this.commentaries = response;
    }, error =>{

    });
  }
}
