import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { New } from 'src/app/core/models/New.model';
import {RepositoryService} from '../../../core/services/repository.service';
import {Commentary} from '../../../core/models/Commentary.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newInfo: New;
  news: New[] =  [];
  openModal: boolean;
  placeholder='Comenta esta publicación aquí';
  titleModal='Comentar publicación';
  modalTextButton='Comentar';
  loadingSend: boolean;
  messageInModal: string;
  openModalCommentaries: boolean;
  commentaries: Commentary[];

  constructor(private requestService: RepositoryService) { }

  ngOnInit() {
    this.getNews();
  }

  getNews(){
    this.requestService.getNews().then(response =>{
      this.news = response.reverse();
      console.log('news: ', this.news);
      let content = document.getElementById('content-super');
      if(this.news.length>0 && this.news.length<3){
        content.className ='content-super-height';
      } else if(this.news.length===0){
        content.className = 'content-super-height';
      } else{
        content.className = 'content-super';
      }
    },error =>{

    });
  }
  commit(new_){
    this.newInfo = new_;
    this.openModal = true;
  }
  closeModal(event){
    this.openModal=event;
  }

  getText(commentary){
    let commentaryDto: Commentary = new Commentary();
    // info de news
    commentaryDto.publishDate = this.newInfo.publish;
    commentaryDto.idNews= this.newInfo.id;
    commentaryDto.information = this.newInfo.information;
    // user info
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    commentaryDto.document = userInfo.documentNumber;
    commentaryDto.cellphone = userInfo.cellphone;
    commentaryDto.name = userInfo.name;
    // commentary info
    commentaryDto.message = commentary;

    this.requestService.saveCommentary(commentaryDto).then(response =>{
    this.setTextSuccessfulInModal();
    this.newInfo.commentaries++;
    }, error =>{
    this.setTextFailInModal();
    });
  }

  setTextSuccessfulInModal(){
    this.loadingSend=false;
    this.messageInModal = 'El comentario ha sido enviado!';
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
    this.messageInModal = 'Ocurrio un error al enviar el comentario';
    this.resetMessage();
  }
  closeModalCommentaries(event){
    this.openModalCommentaries = event;
  }

  showCommentaries(new_: New){
    this.openModalCommentaries = true;
    this.requestService.getCommentaries(new_.id).then(response =>{
      this.commentaries = response.reverse();
    }, error =>{
      alert('ocurrio un error al obtener los comentarios');
    });
  }
}
