import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatricaleventDetailsComponent } from './theatricalevent-details.component';

describe('TheatricaleventDetailsComponent', () => {
  let component: TheatricaleventDetailsComponent;
  let fixture: ComponentFixture<TheatricaleventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheatricaleventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheatricaleventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
