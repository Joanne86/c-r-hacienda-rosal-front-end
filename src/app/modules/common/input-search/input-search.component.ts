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
    return true;
  }
}
