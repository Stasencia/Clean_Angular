import { TestBed } from '@angular/core/testing';

import { TicketPurchaseService } from './ticket-purchase.service';

describe('TicketPurchaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketPurchaseService = TestBed.get(TicketPurchaseService);
    expect(service).toBeTruthy();
  });
});
