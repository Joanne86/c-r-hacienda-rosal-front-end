import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { RequestService } from './request.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RepositoryService {

  constructor(private req: RequestService) { }
  public getUser(userName: string){
    return this.req.get(`/login/get-user/`, { queryParams: { userName: userName } });
  }

  public getAllResidents() {
    return this.req.get(`/resident/get-residents/`);
  }

  public saveResidents(residents) {
    return this.req.post(`/notification/add-all-residents/`, { data: residents });
  }

  public deleteNumber(cellphone){
    return this.req.delete(`/notification/delete-number/`, { queryParams: { cellphone: cellphone } });
  }

  public updateResident(resident){
    return this.req.put(`/resident/update/`, { data: resident });
  }

  public addNumber(cellphone){
    return this.req.post(`/notification/add-number/`, { queryParams: { cellphone: cellphone } });
  }

  public addDebtorNumber(cellphone){
    return this.req.post(`/notification/add-debtor-number/`, { queryParams: { cellphone: cellphone } });
  }

  public saveDebtorNumbers(residents) {
    return this.req.post(`/notification/add-debtors-numbers/`, { data: residents });
  }

  public saveResident(resident) {
    return this.req.post(`/resident/save-resident/`, { data: resident });
  }

  public notifyResident(messageDto) {
    return this.req.post(`/notification/send-message-to-one/`, { data: messageDto });
  }

  public notifyAllResidents(message) {
    return this.req.post(`/notification/send-message-to-all/`, { data: message });
  }

  public notifyAllDebtors(message) {
    return this.req.post(`/notification/send-message-to-debtors/`, { data: message });
  }

  public getAllDebtors(){
    return this.req.get(`/resident/get-debtors/`);
  }

  public getNews(){
    return this.req.get(`/publish/get-news/`);
  }

  public publish(news){
    return this.req.post(`/publish/save-new/`, { data: news });
  }
  public saveCommentary(commentaryDto){
    return this.req.post(`/publish/save-commentary/`, { data: commentaryDto });
  }
}
