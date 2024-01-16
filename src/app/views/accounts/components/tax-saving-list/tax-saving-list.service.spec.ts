import { TestBed } from '@angular/core/testing';

import { TaxSavingListService } from './tax-saving-list.service';

describe('TaxSavingListService', () => {
  let service: TaxSavingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxSavingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
