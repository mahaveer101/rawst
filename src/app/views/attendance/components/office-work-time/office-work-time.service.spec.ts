import { TestBed } from '@angular/core/testing';

import { OfficeWorkTimeService } from './office-work-time.service';

describe('OfficeWorkTimeService', () => {
  let service: OfficeWorkTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeWorkTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
