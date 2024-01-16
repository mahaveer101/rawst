import { TestBed } from '@angular/core/testing';

import { ShiftListService } from './shift-list.service';

describe('ShiftListService', () => {
  let service: ShiftListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
