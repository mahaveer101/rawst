import { TestBed } from '@angular/core/testing';

import { SalaryBreakupService } from './salary-breakup.service';

describe('SalaryBreakupService', () => {
  let service: SalaryBreakupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryBreakupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
