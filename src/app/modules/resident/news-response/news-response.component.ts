import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-response',
  templateUrl: './news-response.component.html',
  styleUrls: ['./news-response.component.css']
})
export class NewsResponseComponent implements OnInit {

  requestResidents;
  constructor() { }

  ngOnInit() {
  }
  getResponse(text){
    // call service
  }
}
