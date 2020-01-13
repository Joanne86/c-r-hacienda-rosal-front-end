import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotifyResidentsComponent } from './admin-notify-residents.component';

describe('AdminNotifyResidentsComponent', () => {
  let component: AdminNotifyResidentsComponent;
  let fixture: ComponentFixture<AdminNotifyResidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotifyResidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotifyResidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
