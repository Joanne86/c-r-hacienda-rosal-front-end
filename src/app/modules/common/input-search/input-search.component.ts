import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {

  classButton = 'btn-search-disable';
  text;
  constructor() { }

  ngOnInit() {
  }

  validateField(){
    if(this.text){
      this.classButton = 'btn-search';
      return false;
    }else{
      this.classButton = 'btn-search-disable';
      return true;
    }
  }

}
