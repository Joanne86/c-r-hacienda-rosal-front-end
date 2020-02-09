import { Component, OnInit } from '@angular/core';
import { New } from 'src/app/core/models/New.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  new_: New = new New();
  news: New[] =  new Array();

  constructor() { }

  ngOnInit() {
  }

  

}
