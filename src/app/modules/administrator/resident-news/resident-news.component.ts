import { Component, OnInit } from '@angular/core';
import {RepositoryService} from '../../../core/services/repository.service';
import {RequestDto} from '../../../core/models/RequestDto.model';

@Component({
  selector: 'app-resident-news',
  templateUrl: './resident-news.component.html',
  styleUrls: ['./resident-news.component.css']
})
export class ResidentNewsComponent implements OnInit {

  requestResidents = new Array<RequestDto>();
  typeRequestEnum = {
    1: 'Queja',
    2: 'Sugerencia',
    3: 'Petición'
  };

  constructor(private requestService : RepositoryService) { }

  ngOnInit() {
    this.getAllRequest();
  }
  getAllRequest(){
    this.requestService.getAllRequest().then(response =>{
      this.requestResidents = response.reverse();
    }, error =>{

    });
  }
}
