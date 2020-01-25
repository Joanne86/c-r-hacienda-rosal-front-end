import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RememberDebtorsComponent } from './remember-debtors.component';

describe('RememberDebtorsComponent', () => {
  let component: RememberDebtorsComponent;
  let fixture: ComponentFixture<RememberDebtorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RememberDebtorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RememberDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
