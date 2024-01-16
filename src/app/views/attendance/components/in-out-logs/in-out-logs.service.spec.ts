import { TestBed } from '@angular/core/testing';

import { InOutLogsService } from './in-out-logs.service';

describe('InOutLogsService', () => {
  let service: InOutLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InOutLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
