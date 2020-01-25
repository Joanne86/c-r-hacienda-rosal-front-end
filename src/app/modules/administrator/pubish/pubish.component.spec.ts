import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubishComponent } from './pubish.component';

describe('PubishComponent', () => {
  let component: PubishComponent;
  let fixture: ComponentFixture<PubishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
