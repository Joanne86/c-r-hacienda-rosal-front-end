import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {
  @Output('textSearch') textSearch = new EventEmitter<any>();
  text;
  button;
  constructor() { }

  ngOnInit() {
    this.button = document.getElementById('btn-search-id');
  }

  validateField() {
    this.textSearch.emit(this.text);
    if (this.text){
      this.button.className = 'btn-search';
      return false;
    } else {
      this.button.className = 'btn-search-disable';
      return true;
    }
  }

  search() {
    console.log('text: ', this.text);
    this.textSearch.emit(this.text);
  }

}
