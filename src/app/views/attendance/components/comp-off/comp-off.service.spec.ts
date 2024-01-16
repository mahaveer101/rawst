import { TestBed } from '@angular/core/testing';

import { CompOffService } from './comp-off.service';

describe('CompOffService', () => {
  let service: CompOffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompOffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
