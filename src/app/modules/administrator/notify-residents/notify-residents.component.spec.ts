import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyResidentsComponent } from './notify-residents.component';

describe('NotifyResidentsComponent', () => {
  let component: NotifyResidentsComponent;
  let fixture: ComponentFixture<NotifyResidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyResidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyResidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
