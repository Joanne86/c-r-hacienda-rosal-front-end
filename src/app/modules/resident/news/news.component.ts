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
}
