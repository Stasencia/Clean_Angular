import { TestBed } from '@angular/core/testing';

import { AfishaService } from './afisha.service';

describe('AfishaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AfishaService = TestBed.get(AfishaService);
    expect(service).toBeTruthy();
  });
});
