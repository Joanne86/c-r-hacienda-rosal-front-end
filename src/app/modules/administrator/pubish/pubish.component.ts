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
  new_: New;
  news: New[] =  [];
  openModal = false;
  titleModal = 'Publicar noticia';
  placeholder = 'Escribe aquí una publicación';
  modalTextButton = 'Publicar';
  loadingSend;
  messageInModal;
  openModalCommentaries: boolean;
  commentaries: Commentary[];

  openModalEdit = false;
  titleModalEdit = 'Editar noticia';
  placeholderEdit = 'Edita la publicación';
  modalTextButtonEdit = 'Editar';
  loadingSendEdit;
  messageInModalEdit;
  openModalCommentariesEdit: boolean;

  information: string;

  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.getNews();
  }

  getNews(){
    this.requestService.getNews().then(response =>{
      this.news = response.reverse();
      this.setStyle();
    },error =>{
      alert('Ocurrio un error al mostrar las noticias');
    });
  }
  setStyle(){
    let content = document.getElementById('content-super');
    if(this.news.length>0 && this.news.length<3){
      content.className ='content-super-height';
    } else if(this.news.length===0){
      content.className = 'content-super-height';
    } else{
      content.className = 'content-super';
    }
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

  closeModalEdit(event){
    this.openModalEdit=event;
  }
  closeModalCommentaries(event){
    this.openModalCommentaries = event;
  }
  getTextPublish(text) {
    console.log(text);
    let new_ : New = new New();
    new_.information = text;
    this.requestService.publish(new_).then(response =>{
      response.commentaries = 0;
      this.news.unshift(response);
      this.setStyle();
      this.setTextSuccessfulInModal();
    }, error =>{
      this.setTextFailInModal();
    });
  }
  getTextEdit(text){
    this.new_.information = text;
    this.requestService.updatePublish(this.new_).then(response =>{
      this.new_.publish=response.publish;
      this.setTextSuccessfulInModalEdit();
    }, error =>{
      this.setTextFailInModalEdit();
    });
  }

  setTextSuccessfulInModalEdit(){
    this.loadingSendEdit=false;
    this.messageInModalEdit = 'Noticia editada exitosamente!';
    this.resetMessageEdit();
  }
  resetMessageEdit() {
    setTimeout(() => {
      this.messageInModalEdit='';
      this.loadingSendEdit = false;
    }, 3000);
  }
  setTextFailInModalEdit(){
    this.loadingSendEdit=false;
    this.messageInModalEdit = 'Ocurrio un error al editar noticia';
    this.resetMessage();
  }

  showModalEdit(new_: New){
    this.new_=new_;
    this.information=new_.information;
    this.openModalEdit = true;
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
      this.commentaries = response.reverse();
    }, error =>{
      alert('ocurrio un error al obtener los comentarios');
    });
  }
}
