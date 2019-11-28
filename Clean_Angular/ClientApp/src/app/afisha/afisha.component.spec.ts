import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfishaComponent } from './afisha.component';

describe('AfishaComponent', () => {
  let component: AfishaComponent;
  let fixture: ComponentFixture<AfishaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfishaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfishaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
