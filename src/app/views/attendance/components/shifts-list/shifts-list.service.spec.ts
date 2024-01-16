import { TestBed } from '@angular/core/testing';

import { ShiftsListService } from './shifts-list.service';

describe('ShiftsListService', () => {
  let service: ShiftsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
