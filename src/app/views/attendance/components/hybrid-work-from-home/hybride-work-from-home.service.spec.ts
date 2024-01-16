import { TestBed } from '@angular/core/testing';

import { HybrideWorkFromHomeService } from './hybride-work-from-home.service';

describe('HybrideWorkFromHomeService', () => {
  let service: HybrideWorkFromHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HybrideWorkFromHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
