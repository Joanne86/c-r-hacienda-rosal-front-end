import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExcelDataComponent } from './select-excel-data.component';

describe('SelectExcelDataComponent', () => {
  let component: SelectExcelDataComponent;
  let fixture: ComponentFixture<SelectExcelDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectExcelDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExcelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
