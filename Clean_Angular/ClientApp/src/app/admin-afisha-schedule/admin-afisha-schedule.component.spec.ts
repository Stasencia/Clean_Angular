import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAfishaScheduleComponent } from './admin-afisha-schedule.component';

describe('AdminAfishaScheduleComponent', () => {
  let component: AdminAfishaScheduleComponent;
  let fixture: ComponentFixture<AdminAfishaScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAfishaScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAfishaScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
