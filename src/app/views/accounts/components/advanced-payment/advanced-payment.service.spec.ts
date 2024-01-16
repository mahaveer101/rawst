import { TestBed } from '@angular/core/testing';

import { AdvancedPaymentService } from './advanced-payment.service';

describe('AdvancedPaymentService', () => {
  let service: AdvancedPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancedPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
