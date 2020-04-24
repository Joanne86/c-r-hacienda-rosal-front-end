import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Output() optionFilterType  = new EventEmitter<any>();
  @Output() optionFilterState  = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  filterRequestType(stateRequest){
    this.optionFilterType.emit(stateRequest);
  }
  filterRequestState(stateRequest){
    this.optionFilterState.emit(stateRequest);
  }

}
