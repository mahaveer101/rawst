import { TestBed } from '@angular/core/testing';

import { AllInOutLogsService } from './all-in-out-logs.service';

describe('AllInOutLogsService', () => {
  let service: AllInOutLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllInOutLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
