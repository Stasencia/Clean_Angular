import { TestBed } from '@angular/core/testing';

import { AdminAfishaService } from './admin-afisha.service';

describe('AdminAfishaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAfishaService = TestBed.get(AdminAfishaService);
    expect(service).toBeTruthy();
  });
});
