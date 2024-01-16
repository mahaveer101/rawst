import { TestBed } from '@angular/core/testing';

import { PreviousTaxIncentiveService } from './previous-tax-incentive.service';

describe('SalaryBreakupService', () => {
  let service: PreviousTaxIncentiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousTaxIncentiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});