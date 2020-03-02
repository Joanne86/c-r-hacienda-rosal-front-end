import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsResponseComponent } from './news-response.component';

describe('NewsResponseComponent', () => {
  let component: NewsResponseComponent;
  let fixture: ComponentFixture<NewsResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
