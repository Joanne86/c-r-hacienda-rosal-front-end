import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentNewsComponent } from './resident-news.component';

describe('ResidentNewsComponent', () => {
  let component: ResidentNewsComponent;
  let fixture: ComponentFixture<ResidentNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
