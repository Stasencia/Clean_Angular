import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAfishaComponent } from './admin-afisha.component';

describe('AdminAfishaComponent', () => {
  let component: AdminAfishaComponent;
  let fixture: ComponentFixture<AdminAfishaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAfishaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAfishaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
