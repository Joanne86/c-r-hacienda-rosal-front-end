import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import * as proxy from '../../../proxy.config.json';

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
    return this.req.post(`/notification/add-all-numbers/`, { data: residents });
  }

  public notifyResident(messageDto) {
    return this.req.post(`/notification/send-message-to-one/`, { data: messageDto });
  }

  public notifyAllResidents(message) {
    return this.req.post(`/notification/send-message-to-all/`, { data: message });
  }

  public getAllDebtors(){
    return this.req.get(`/resident/get-debtors/`);
  }
}
