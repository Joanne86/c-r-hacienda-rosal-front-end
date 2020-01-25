import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNewsComponent } from './send-news.component';

describe('SendNewsComponent', () => {
  let component: SendNewsComponent;
  let fixture: ComponentFixture<SendNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
