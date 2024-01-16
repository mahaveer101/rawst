import { TestBed } from '@angular/core/testing';

import { AllShiftService } from './all-shift.service';

describe('AllShiftService', () => {
  let service: AllShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
